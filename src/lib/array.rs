use serde::Deserialize;
use std::{collections::HashMap, error::Error, fs::File, io::Read, sync::Arc};

#[derive(Deserialize, Clone)]
pub struct ArrayObject {
    yaw: Option<f32>,
    aliases: Option<Vec<String>>,
    film: Option<String>,
}

type Map = Arc<HashMap<String, ArrayObject>>;

async fn json_to_hashmap() -> Result<Map, Box<dyn Error + Send + Sync>> {
    let mut s = String::new();
    File::open("array.json")
        .unwrap()
        .read_to_string(&mut s)
        .unwrap();

    // Read the JSON contents of the file as an instance of `User`.
    let map: Result<HashMap<String, ArrayObject>, serde_json::Error> = serde_json::from_str(&s);
    Ok(Arc::new(map.unwrap()))
}

#[derive(Clone)]
pub struct GameCollection {
    pub games: Map,
    aliases: HashMap<String, String>,
}

fn create_aliases_map(games: Map) -> HashMap<String, String> {
    let mut map = HashMap::new();
    for game in games.keys() {
        for alias in games[game].aliases.as_ref().unwrap() {
            map.insert(alias.to_string(), game.to_string());
        }
    }
    map
}

impl GameCollection {
    pub async fn new() -> Self {
        let games = json_to_hashmap().await.unwrap();
        GameCollection {
            games: Arc::clone(&games),
            aliases: create_aliases_map(games),
        }
    }

    pub fn get(&self, query: String, query_type: QueryType) -> Result<QueryResult, &'static str> {
        let mut foundobject = None;
        for (alias, key) in &self.aliases {
            if alias.to_owned() == query || alias == key {
                foundobject = Some(&self.games[key]);
                break;
            }
        }
        if foundobject.is_none() {
            return Err("cannont find");
        }
        match query_type {
            QueryType::Aliases => Ok(QueryResult::Aliases(
                foundobject.unwrap().aliases.as_ref().unwrap().clone(),
            )),
            QueryType::FILM => Ok(QueryResult::FILM(
                foundobject.unwrap().film.as_ref().unwrap().clone(),
            )),
            QueryType::Yaw => Ok(QueryResult::Yaw(foundobject.unwrap().yaw.unwrap())),
        }
    }
}

enum QueryResult {
    Yaw(f32),
    Aliases(Vec<String>),
    FILM(String),
}

pub enum QueryType {
    Yaw,
    Aliases,
    FILM,
}
