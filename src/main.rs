use futures::StreamExt;
use std::{env, error::Error, sync::Arc, time::Duration};
use tokio::runtime::Builder;
use tracing::debug;
use twilight_gateway::{cluster::ClusterBuilder, Intents};
use twilight_http::Client;
use twilight_model::gateway::{
    payload::outgoing::update_presence::UpdatePresencePayload,
    presence::{ActivityType, MinimalActivity, Status},
};

use dotenv::dotenv;

use crate::{handler::handle_event, lib::container::Container};

mod commands;
mod handler;
mod lib;

fn main() -> Result<(), Box<dyn Error + Send + Sync>> {
    dotenv().ok();
    tracing_subscriber::fmt::init();
    let runtime = Builder::new_multi_thread()
        .enable_all()
        .build()
        .expect("Failed to build tokio runtime");

    runtime.block_on(async_main())?;

    runtime.shutdown_timeout(Duration::from_millis(500));

    Ok(())
}

async fn async_main() -> Result<(), Box<dyn Error + Send + Sync>> {
    let token = env::var("DISCORD_TOKEN")?;

    let http = Arc::new(Client::new(token.clone()));

    let intents = Intents::DIRECT_MESSAGES;
    let (cluster, mut events) = ClusterBuilder::new(token, intents)
        .presence(UpdatePresencePayload::new(
            vec![MinimalActivity {
                kind: ActivityType::Playing,
                name: "fpsmath.xyz".into(),
                url: None,
            }
            .into()],
            false,
            None,
            Status::Online,
        )?)
        .http_client(http.clone())
        .build()
        .await?;
    let cluster = Arc::new(cluster);

    let cluster_spawn = cluster.clone();
    tokio::spawn(async move {
        cluster_spawn.up().await;
    });

    let current_app = http
        .current_user_application()
        .exec()
        .await?
        .model()
        .await?
        .id;

    let container = Arc::new(Container::new(current_app, cluster, http).await);

    while let Some((shard_id, event)) = events.next().await {
        debug!("New Event: {:?}", event.kind());
        let c_clone = container.clone();
        tokio::spawn(handle_event(event, shard_id, c_clone));
    }
    println!("closing down!");

    Ok(())
}
