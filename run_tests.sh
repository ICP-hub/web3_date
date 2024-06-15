#!/bin/bash

# Stop on the first sign of trouble
set -e

# Echo each command
set -x

echo "Running tests for the Rust project..."

# Clean previous builds (optional)
# echo "Cleaning previous builds..."
# cargo clean

# Build the project
echo "Building the project..."
dfx build

# Run tests
echo "Running tests..."
cargo test

echo "Tests completed."
