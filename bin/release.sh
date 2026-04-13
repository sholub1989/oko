#!/usr/bin/env bash
set -euo pipefail

VERSION="$1"
VERSION="${VERSION#v}"  # strip leading v if present

if [ -z "$VERSION" ]; then
  echo "Usage: pnpm release <version>"
  echo "Example: pnpm release 0.5.0"
  exit 1
fi

# Prevent manual npm publish — CI handles it
if [ -n "${CI:-}" ]; then
  echo "ERROR: release.sh is for local use only (bumps version, tags, pushes)."
  echo "npm publish is handled by CI on tag push."
  exit 1
fi

# Build first to ensure everything compiles
echo "Building..."
pnpm build

# Audit the package before proceeding
echo "Auditing package contents..."
PACK_OUTPUT=$(npm pack --dry-run 2>&1)

# Check for source code leaks
if echo "$PACK_OUTPUT" | grep -qE '\.ts$|\.tsx$' | grep -v '\.d\.ts$'; then
  echo "ERROR: TypeScript source files detected in package!"
  echo "$PACK_OUTPUT" | grep -E '\.ts$|\.tsx$'
  exit 1
fi

if echo "$PACK_OUTPUT" | grep -q '/src/'; then
  echo "ERROR: src/ directories detected in package!"
  echo "$PACK_OUTPUT" | grep '/src/'
  exit 1
fi

if echo "$PACK_OUTPUT" | grep -q '\.map$'; then
  echo "ERROR: Sourcemap files detected in package!"
  echo "$PACK_OUTPUT" | grep '\.map$'
  exit 1
fi

# Show what will be published
echo ""
echo "Package contents:"
echo "$PACK_OUTPUT" | grep "npm notice" | grep -E "^\s*npm notice\s+[0-9]" || true
echo ""

# Update package.json version
node -e "
  const pkg = JSON.parse(require('fs').readFileSync('package.json','utf8'));
  pkg.version = '$VERSION';
  require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Commit, tag, push — CI will publish to npm on tag push
git add package.json
git commit -m "v${VERSION}"
git tag "v${VERSION}"
git push origin master --tags

echo ""
echo "Released v${VERSION} — CI will publish to npm automatically."
