#!/usr/bin/env bash
# Run offline checks from any directory.
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
python3 "$REPO_ROOT/scripts/public-check.py"
node "$REPO_ROOT/scripts/validate-protocol.mjs" "$REPO_ROOT"
node --test "$REPO_ROOT"/scripts/tests/*.test.mjs
