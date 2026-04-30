#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/vidhi-satya}"
BRANCH="${BRANCH:-main}"
APP_NAME="${APP_NAME:-vidhi-satya}"

echo "Deploying ${APP_NAME} from branch ${BRANCH} in ${APP_DIR}"
cd "${APP_DIR}"

if [ ! -f package.json ]; then
  echo "package.json not found in ${APP_DIR}"
  exit 1
fi

git fetch origin "${BRANCH}"
git checkout "${BRANCH}"
git pull --ff-only origin "${BRANCH}"

npm ci
npm run prepare:uploads
npm run build

if pm2 describe "${APP_NAME}" > /dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only "${APP_NAME}" --env production
else
  pm2 start ecosystem.config.cjs --only "${APP_NAME}" --env production
fi

pm2 save
echo "Deployment completed for ${APP_NAME}"
