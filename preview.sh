#!/bin/bash
set -e

echo "Serving _site/ at http://localhost:8000"
python3 -m http.server 8000 --directory _site
