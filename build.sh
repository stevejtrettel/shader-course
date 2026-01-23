#!/bin/bash
set -e

# Ensure we're in the repo root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Install Quarto if not available (for Netlify)
if ! command -v quarto &> /dev/null; then
    echo "=== Installing Quarto ==="
    curl -LO https://quarto.org/download/latest/quarto-linux-amd64.deb
    dpkg -x quarto-linux-amd64.deb .
    export PATH="$PWD/opt/quarto/bin:$PATH"
    rm quarto-linux-amd64.deb
fi

echo "=== Building main site ==="
cd main && quarto render && cd ..

echo "=== Building CIRM course ==="
cd cirm && quarto render && cd ..

echo "=== Combining outputs ==="
rm -rf _site
mkdir _site

# Copy main site to root
cp -r main/_site/* _site/

# Copy CIRM course to /cirm-2026/
cp -r cirm/_site _site/cirm-2026

echo "=== Build complete ==="
echo "Output in _site/"
