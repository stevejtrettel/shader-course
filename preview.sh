#!/bin/bash
set -e

# Build and preview the combined site
./build.sh

echo "=== Starting preview server ==="
echo "Open http://localhost:8000"
python3 -m http.server 8000 --directory _site
