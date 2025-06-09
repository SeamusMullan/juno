#!/bin/bash

# Update Reviews List Script
# This script updates the reviews list and can be run manually or automated

echo "🔄 Updating reviews list..."

# Change to the reviews directory
cd "$(dirname "$0")"

# Run the Node.js script
node generate-list.js

# Check if successful
if [ $? -eq 0 ]; then
    echo "✅ Reviews list updated successfully!"
    echo "📂 Updated file: $(pwd)/list.md"
else
    echo "❌ Failed to update reviews list"
    exit 1
fi
