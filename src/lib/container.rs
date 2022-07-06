use std::{ops::Deref, sync::Arc};

use twilight_gateway::Cluster;
use twilight_http::Client;
use twilight_model::id::{marker::ApplicationMarker, Id};

use super::array::GameCollection;

#[derive(Clone)]
pub struct ContainerRef {
    pub application_id: Id<ApplicationMarker>,
    pub cluster: Arc<Cluster>,
    pub http: Arc<Client>,
    pub games: GameCollection,
}

impl ContainerRef {
    fn new(
        application_id: Id<ApplicationMarker>,
        cluster: Arc<Cluster>,
        http: Arc<Client>,
        games: GameCollection,
    ) -> Self {
        ContainerRef {
            application_id,
            cluster,
            http,
            games,
        }
    }

    pub fn interaction(&self) -> twilight_http::client::InteractionClient<'_> {
        self.http.interaction(self.application_id)
    }
}

#[derive(Clone)]
pub struct Container(pub Arc<ContainerRef>);

impl Container {
    pub async fn new(
        application_id: Id<ApplicationMarker>,
        cluster: Arc<Cluster>,
        http: Arc<Client>,
    ) -> Self {
        Container(Arc::new(ContainerRef::new(
            application_id,
            cluster,
            http,
            GameCollection::new().await,
        )))
    }
}

impl Deref for Container {
    type Target = ContainerRef;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
