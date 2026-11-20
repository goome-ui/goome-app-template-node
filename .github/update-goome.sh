#!/usr/bin/env bash
set -euo pipefail

github_api() {
  if [ -n "${GH_TOKEN:-}" ]; then
    curl -fsS -H "Authorization: Bearer $GH_TOKEN" "$1"
  else
    curl -fsS "$1"
  fi
}

latest_version() {
  github_api https://api.github.com/repos/goome-ui/node-goome/releases/latest | jq -r .tag_name | stable_only
}

current_version() {
  grep -m1 'node-goome/releases/download' package.json | sed -E 's|.*/download/v([^/]+)/.*|\1|'
}

tarball() {
  echo "https://github.com/goome-ui/node-goome/releases/download/v$1/goome-$1.tgz"
}

published() {
  curl -fsIL -o /dev/null "$(tarball "$1")"
}

apply_pins() {
  old=$(current_version)
  sed -i "s|$(tarball "$old")|$(tarball "$1")|g" package.json
  if [ -f package-lock.json ]; then
    npm install --package-lock-only --no-audit --no-fund
  fi
}

smoke() {
  export GOOME_BACKEND=test
  if [ "${GOOME_NOSMOKE:-}" = 1 ]; then
    echo "smoke check skipped"
    return
  fi
  work=$(mktemp -d)
  npm install --no-audit --no-fund --no-package-lock
  mkdir -p "$work/shots"
  out=$(GOOME_TEST_SHOTS="$work/shots" GOOME_TEST_SCRIPT="screen 1280x720 1; 3 click 60,28; end 6" node main.js)
  echo "$out"
  ls "$work/shots" | grep -q ppm
  if [ -d variants ]; then echo "$out" | grep -q "overlay mode"; fi
  for v in variants/*/; do
    [ -d "$v" ] || continue
    name=$(basename "$v")
    mkdir -p "$work/shots-$name"
    GOOME_TEST_SHOTS="$work/shots-$name" GOOME_TEST_SCRIPT="screen 1280x720 1; 2 hotkey alt+m; 3 click 100,140; end 6" node "$v/main.js"
    ls "$work/shots-$name" | grep -q ppm
  done
  rm -rf "$work"
}

is_newer() {
  [ "$1" != "$2" ] && [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | tail -n1)" = "$1" ]
}

stable_only() {
  grep -E '^v?[0-9]+\.[0-9]+\.[0-9]+$' | sed 's/^v//'
}

set_identity() {
  git config user.name "$(git log -1 --format=%an)"
  git config user.email "$(git log -1 --format=%ae)"
}

commit_and_push() {
  branch=$1
  message=$2
  if [ "${GOOME_DRY:-}" = 1 ]; then
    git --no-pager diff --stat
    return
  fi
  git commit -q -a -m "$message"
  git push -q origin "$branch"
}

on_branch() {
  if [ "${GOOME_DRY:-}" != 1 ]; then
    git checkout -q "$1"
    git pull -q --ff-only origin "$1"
  fi
}

run() {
  latest=$(latest_version)
  if [ -z "$latest" ]; then
    echo "could not read the latest version"
    exit 1
  fi
  on_branch dev
  current=$(current_version)
  echo "latest $latest, pinned $current"
  if ! is_newer "$latest" "$current"; then
    echo "up to date"
    exit 0
  fi
  if ! published "$latest"; then
    echo "$latest is not available from the registry yet"
    exit 0
  fi
  set_identity
  apply_pins "$latest"
  smoke
  commit_and_push dev "Bump goome to $latest"
  if [ "${GOOME_DRY:-}" = 1 ]; then
    exit 0
  fi
  git checkout -q main
  git pull -q --ff-only origin main
  if is_newer "$latest" "$(current_version)"; then
    apply_pins "$latest"
    commit_and_push main "Update to $latest"
  fi
}

run
