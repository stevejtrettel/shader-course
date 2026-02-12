#!/bin/bash
# Pre-render script for Quarto: builds all shaders before site render.
#
# Walks the project tree for **/shaders/ directories and builds each shader
# to dist/<parent-path>/<shader-name>/main.js for the {{< shader >}} shortcode.
#
# Example layout:
#   3d/raymarching/shaders/sdf-basics/ → dist/3d/raymarching/sdf-basics/

node build-shaders.mjs
