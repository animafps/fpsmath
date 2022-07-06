use std::{error::Error, result::Result, sync::Arc};

use tracing::{info, warn};
use twilight_gateway::Event;
use twilight_model::{
    application::interaction::{ApplicationCommandAutocomplete, Interaction},
    http::interaction::{InteractionResponse, InteractionResponseType},
};
use twilight_util::builder::InteractionResponseDataBuilder;

use crate::lib::container::Container;

pub async fn handle_event(
    event: Event,
    shard_id: u64,
    container: Arc<Container>,
) -> Result<(), Box<dyn Error + Send + Sync>> {
    match event {
        Event::Ready(ready) => {
            info!("In {} guilds!", ready.guilds.len());
            Ok(())
        }
        Event::ShardConnected { .. } => {
            info!("Shard {shard_id} is now connected");
            Ok(())
        }
        Event::ShardDisconnected { .. } => {
            info!("Shard {shard_id} is now disconnected");
            Ok(())
        }
        Event::InteractionCreate(interaction) => {
            match handle_slash(interaction.0, container).await {
                Ok(_) => (),
                Err(why) => warn!("Error handling slash: {}", why),
            }
            Ok(())
        }
        _ => Ok(()),
    }
}

async fn handle_slash(
    interaction: Interaction,
    container: Arc<Container>,
) -> Result<(), Box<dyn Error + Send + Sync>> {
    let slash = match interaction {
        Interaction::ApplicationCommand(cmd) => *cmd,
        Interaction::ApplicationCommandAutocomplete(cmd) => {
            handle_autocomplete(cmd, container).await?;
            return Ok(());
        }
        _ => return Ok(()),
    };

    container
        .interaction()
        .create_response(
            slash.id,
            &slash.token,
            &InteractionResponse {
                kind: InteractionResponseType::ChannelMessageWithSource,
                data: Some(
                    InteractionResponseDataBuilder::new()
                        .content("Pong".to_string())
                        .build(),
                ),
            },
        )
        .exec()
        .await?;
    Ok(())
}

async fn handle_autocomplete(
    cmd: Box<ApplicationCommandAutocomplete>,
    container: Arc<Container>,
) -> Result<(), Box<dyn Error + Send + Sync>> {
    Ok(())
}
