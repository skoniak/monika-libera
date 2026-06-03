#!/bin/bash
cd /var/www/monika-libera
git pull origin master
npm install --production
echo "{\"build\":$(git rev-list --count HEAD),\"date\":\"$(date +%Y.%m.%d-%H:%M)\"}" > public/version.json
npm run build
sudo systemctl restart monika-libera
echo "Deploy done: build #$(git rev-list --count HEAD)"
