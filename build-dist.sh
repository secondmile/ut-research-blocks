#!/bin/bash

# Build distribution package for UT Research Blocks plugin

echo "Building UT Research Blocks distribution package..."

# Build production assets
echo "Running npm build..."
npm run build

# Create dist directory
echo "Creating distribution directory..."
rm -rf dist
mkdir -p dist/ut-research-blocks

# Copy necessary files
echo "Copying files..."
rsync -av --exclude-from='.distignore' . dist/ut-research-blocks/

# Create zip for distribution
echo "Creating zip archive..."
cd dist
zip -r ut-research-blocks.zip ut-research-blocks
cd ..

echo "Distribution package created: dist/ut-research-blocks.zip"
