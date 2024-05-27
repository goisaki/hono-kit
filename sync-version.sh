#!/bin/bash

# Get the version from ./Cargo.toml
VERSION=$(grep '^version =' "./Cargo.toml" | sed -E 's/version = "([^"]+)"/\1/')

if [ -z "$VERSION" ]; then
  echo "Version not found in Cargo.toml."
  exit 1
fi

# Check version consistency
for PACKAGE_JSON in ./packages/hono-kit-*/package.json; do
  if [ -f "$PACKAGE_JSON" ]; then
    CURRENT_VERSION=$(jq -r '.version' "$PACKAGE_JSON")
    if [ "$CURRENT_VERSION" != "$VERSION" ]; then
      echo "Version mismatch: $PACKAGE_JSON has version $CURRENT_VERSION, expected $VERSION."
      exit 1
    fi
  fi
done

for PACKAGE_JSON in ./packages/hono-kit-*/package.json; do
  if [ -f "$PACKAGE_JSON" ]; then
    CURRENT_VERSION=$(jq -r '.version' "$PACKAGE_JSON")
    if [ "$CURRENT_VERSION" != "$VERSION" ]; then
      jq --arg version "$VERSION" '.version = $version' "$PACKAGE_JSON" > tmp.$$.json && mv tmp.$$.json "$PACKAGE_JSON"
      echo "Updated $PACKAGE_JSON."
    else
      echo "No update needed for $PACKAGE_JSON."
    fi
  fi
done