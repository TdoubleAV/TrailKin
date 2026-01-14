#!/bin/bash
# validate-json.sh - Validates JSON files in the i18n directory

set -e

echo "🔍 Validating JSON files..."

# Check if jq is available
if ! command -v jq &> /dev/null; then
    echo "❌ jq is not installed. Install it with: sudo apt install jq"
    exit 1
fi

# Validate each JSON file
errors=0

for file in js/i18n/*.json; do
    if jq empty "$file" 2>/dev/null; then
        echo "✅ $file is valid"
    else
        echo "❌ $file has syntax errors:"
        jq . "$file" 2>&1 || true
        errors=$((errors + 1))
    fi
done

if [ $errors -gt 0 ]; then
    echo ""
    echo "❌ $errors file(s) have JSON syntax errors!"
    exit 1
else
    echo ""
    echo "✅ All JSON files are valid!"
    exit 0
fi
