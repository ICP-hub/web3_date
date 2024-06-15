cargo build --release --target wasm32-unknown-unknown --package DDate_backend

candid-extractor target/wasm32-unknown-unknown/release/DDate_backend.wasm > DDate_backend.did

