#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/vidhi-satya}"
APP_NAME="${APP_NAME:-vidhi-satya}"
DOMAIN="${DOMAIN:-your-domain.com}"
WWW_DOMAIN="${WWW_DOMAIN:-www.your-domain.com}"

echo "==> Hostinger VPS setup for ${APP_NAME}"
echo "==> App directory: ${APP_DIR}"
echo "==> Domain(s): ${DOMAIN}, ${WWW_DOMAIN}"

sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl ufw certbot python3-certbot-nginx

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm install -g pm2
fi

if [ ! -d "${APP_DIR}" ]; then
  echo "Directory ${APP_DIR} does not exist."
  echo "Clone the repository first, then run this script again."
  exit 1
fi

cd "${APP_DIR}"

if [ ! -f ".env" ]; then
  echo ".env not found in ${APP_DIR}."
  echo "Run: cp .env.example .env and fill required values."
  exit 1
fi

if ! grep -q '^JWT_SECRET=' .env; then
  echo "JWT_SECRET is missing in .env"
  exit 1
fi

if ! grep -q '^MONGODB_URI=' .env; then
  echo "MONGODB_URI is missing in .env"
  exit 1
fi

npm ci
npm run prepare:uploads
npm run build

if [ "${RUN_SEED:-false}" = "true" ]; then
  npm run seed
fi

if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only "${APP_NAME}" --env production
else
  pm2 start ecosystem.config.cjs --only "${APP_NAME}" --env production
fi

pm2 save
pm2 startup systemd

sudo cp nginx/vidhi-satya.conf /etc/nginx/sites-available/${APP_NAME}
sudo sed -i "s/www.your-domain.com/${WWW_DOMAIN}/g" /etc/nginx/sites-available/${APP_NAME}
sudo sed -i "s/your-domain.com/${DOMAIN}/g" /etc/nginx/sites-available/${APP_NAME}

if [ -L "/etc/nginx/sites-enabled/default" ]; then
  sudo rm /etc/nginx/sites-enabled/default
fi

if [ ! -L "/etc/nginx/sites-enabled/${APP_NAME}" ]; then
  sudo ln -s /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/${APP_NAME}
fi

sudo nginx -t
sudo systemctl reload nginx

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "==> Setup completed."
echo "==> If DNS already points to this VPS, enable SSL:"
echo "sudo certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN}"
