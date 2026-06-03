#!/bin/bash
cd /home/deploy/apps/monika-libera
git pull origin master
npm install
echo "{\"build\":$(git rev-list --count HEAD),\"date\":\"$(date +%Y.%m.%d-%H:%M)\"}" > public/version.json
npm run build
sudo systemctl restart monika-libera
echo "Deploy done: build #$(git rev-list --count HEAD)"
