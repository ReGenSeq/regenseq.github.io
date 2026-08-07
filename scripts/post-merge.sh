#!/bin/bash
set -e

# Post-merge setup — runs automatically after a task agent's changes are merged.
# Must be idempotent, non-interactive, and fast.

echo "Installing dependencies..."
npm install --legacy-peer-deps
echo "Done."
