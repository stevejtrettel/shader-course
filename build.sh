#!/bin/bash
set -e

# Ensure we're in the repo root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== Copying shared styles ==="
cp _shared/styles/* main/styles/
cp _shared/styles/* cirm/styles/

echo "=== Building main site ==="
cd main && quarto render && cd ..

echo "=== Building CIRM course ==="
cd cirm && quarto render && cd ..

echo "=== Combining outputs ==="
rm -rf _site
mkdir _site

# Copy main site to root
cp -r main/_site/* _site/

# Copy CIRM course to /cirm/
cp -r cirm/_site _site/cirm

echo "=== Build complete ==="
echo "Output in _site/"
