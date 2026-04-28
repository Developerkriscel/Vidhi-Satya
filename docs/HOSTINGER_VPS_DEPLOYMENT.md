# Hostinger VPS Deployment Guide

This guide deploys the app as a Node.js service on a Hostinger VPS using:
- PM2 (process manager)
- Nginx (reverse proxy)
- Certbot (HTTPS)
- Squarespace-managed domain DNS

## 1. VPS prerequisites

Use an Ubuntu VPS with sudo access.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl ufw
```

Install Node.js 20 LTS:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

Install PM2 globally:

```bash
sudo npm install -g pm2
pm2 -v
```

## 2. Clone project and configure env

```bash
sudo mkdir -p /var/www/vidhi-satya
sudo chown -R $USER:$USER /var/www/vidhi-satya
git clone <your-repo-url> /var/www/vidhi-satya
cd /var/www/vidhi-satya
cp .env.example .env
```

Set production values in `.env`:
- `MONGODB_URI`
- `MONGODB_DB`
- `JWT_SECRET` (strong random secret)
- `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## 3. Squarespace domain DNS setup

In your Squarespace domain DNS panel, point your domain to the Hostinger VPS.

Required records:
- `A` record: host `@` -> your VPS public IPv4 address
- `CNAME` record: host `www` -> `@` (or `your-domain.com`)

Optional (if your VPS has IPv6):
- `AAAA` record: host `@` -> your VPS public IPv6 address

Important:
- Remove conflicting old `A`/`AAAA`/`CNAME` records for `@` and `www`.
- DNS changes typically propagate in a few minutes, but can take up to 24 hours.

## 4. First-time setup (recommended one command)

Use the setup script included in this repo:

```bash
chmod +x scripts/setup-hostinger-vps.sh
APP_DIR=/var/www/vidhi-satya APP_NAME=vidhi-satya DOMAIN=your-domain.com WWW_DOMAIN=www.your-domain.com ./scripts/setup-hostinger-vps.sh
```

This script:
- installs Nginx, Node.js 20, PM2, Certbot, and UFW rules
- builds the app and starts/reloads PM2
- installs Nginx site config from `nginx/vidhi-satya.conf`

If you want initial database seeding during setup:

```bash
RUN_SEED=true APP_DIR=/var/www/vidhi-satya APP_NAME=vidhi-satya DOMAIN=your-domain.com WWW_DOMAIN=www.your-domain.com ./scripts/setup-hostinger-vps.sh
```

## 5. Manual setup (alternative)

```bash
npm ci
npm run prepare:uploads
npm run build
npm run seed
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup systemd
```

Run the command printed by `pm2 startup systemd` to enable restart on reboot.

## 6. Configure Nginx (manual path)

Copy the included config and replace domain names:

```bash
sudo cp nginx/vidhi-satya.conf /etc/nginx/sites-available/vidhi-satya
sudo nano /etc/nginx/sites-available/vidhi-satya
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/vidhi-satya /etc/nginx/sites-enabled/vidhi-satya
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Enable HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Verify auto-renew:

```bash
sudo systemctl status certbot.timer
```

## 8. Firewall setup

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## 9. Verify deployment

Check app and reverse proxy:

```bash
pm2 status
pm2 logs vidhi-satya --lines 100
curl -I http://127.0.0.1:3000/api/health
curl -I https://your-domain.com/api/health
```

Expected health response: HTTP 200 with JSON status `ok`.

## 10. Future updates

Use the included deploy script:

```bash
chmod +x scripts/deploy-hostinger.sh
APP_DIR=/var/www/vidhi-satya BRANCH=main APP_NAME=vidhi-satya ./scripts/deploy-hostinger.sh
```

The update script does:
- `git pull --ff-only`
- `npm ci`
- `npm run prepare:uploads`
- `npm run build`
- `pm2 reload`

## Notes

- Uploads are stored in `public/uploads`. Keep this directory persistent across deployments.
- If you plan to scale across multiple servers, move uploads to object storage (Cloudinary/S3-compatible).
- Keep `.env` only on the VPS; do not commit secrets to git.
