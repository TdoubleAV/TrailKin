#!/bin/bash
# check-all.sh - Runs all stability checks for Trailkin

set -e

echo "🚀 Starting Trailkin Stability Checks..."
echo "--------------------------------------"

# 1. ESLint
echo "🛡️ Running ESLint..."
if npx eslint js/*.js; then
    echo "✅ ESLint: No critical issues found."
else
    echo "❌ ESLint: Failed. Please fix the errors above."
    exit 1
fi

echo ""

# 2. JSON Validation
echo "🔍 Validating JSON files..."
if [ -f "./scripts/validate-json.sh" ]; then
    if ./scripts/validate-json.sh; then
        echo "✅ JSON: All files valid."
    else
        echo "❌ JSON: Validation failed."
        exit 1
    fi
else
    echo "⚠️ scripts/validate-json.sh not found. Skipping."
fi

echo ""
echo "--------------------------------------"
echo "✨ All checks passed! Ready to commit."
