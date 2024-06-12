use warp::Filter;
use tokio::sync::broadcast;
use warp::ws::{Message, WebSocket};
use std::sync::{Arc, Mutex};
use futures::{StreamExt, SinkExt};
use serde::{Serialize, Deserialize};

#[derive(Clone)]
struct WebSocketServer {
    ws_tx: Arc<Mutex<broadcast::Sender<Message>>>,
}

impl WebSocketServer {
    async fn start_websocket_server(&self) {
        let ws_tx = self.ws_tx.clone();

        let ws_route = warp::path("ws")
            .and(warp::ws())
            .and(with_ws_tx(ws_tx))
            .map(|ws: warp::ws::Ws, ws_tx| {
                ws.on_upgrade(move |socket| Self::handle_socket(socket, ws_tx))
            });

        warp::serve(ws_route).run(([127, 0, 0, 1], 3030)).await;
    }

    async fn handle_socket(socket: WebSocket, ws_tx: Arc<Mutex<broadcast::Sender<Message>>>) {
        let (mut ws_tx_ws, mut ws_rx) = socket.split();
        let ws_tx_main = ws_tx.lock().unwrap().clone(); // Main sender

        // Clone the ws_tx for the async task
        let ws_tx_task = ws_tx_main.clone();

        tokio::task::spawn(async move {
            while let Some(result) = ws_rx.next().await {
                match result {
                    Ok(msg) => {
                        let _ = ws_tx_task.send(msg);
                    }
                    Err(e) => {
                        eprintln!("websocket error: {}", e);
                        break;
                    }
                }
            }
        });

        let mut rx = ws_tx_main.subscribe();
        while let Ok(msg) = rx.recv().await {
            if ws_tx_ws.send(msg).await.is_err() {
                break;
            }
        }
    }
}

fn with_ws_tx(ws_tx: Arc<Mutex<broadcast::Sender<Message>>>) -> impl Filter<Extract = (Arc<Mutex<broadcast::Sender<Message>>>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || ws_tx.clone())
}

#[tokio::main]
async fn main() {
    let (ws_tx, _ws_rx) = broadcast::channel(100);
    let ws_tx = Arc::new(Mutex::new(ws_tx));

    let server = WebSocketServer { ws_tx };
    server.start_websocket_server().await;
}
