#!/usr/bin/env bash
set -e

mode=$1

if [ "$#" -ne 1 ]; then
    echo "Invalid number of arguments. Example: ./restore_mongo.sh {mode=monorepo/docker}"
    exit 1
fi

if [[ $mode != 'monorepo' && $mode != 'docker' ]]; then
    echo "Invalid mode, only monorepo or docker is allowed."
    exit 1
fi

cp frontend/.env.sample frontend/.env.development
cp backend/.env.example backend/.env

# Remove these 2 folder when switching mode because:
# Docker mode create them in root user
# Monorepo mode create then in non-root user mode
# TODO: Fix Docker to create with non-root user (hehe)
sudo rm -rf backend/node_modules backend/dist

sed -i 's/{API_HOST}/http:\/\/localhost:3000/' frontend/.env.development

if [[ $mode = 'monorepo' ]]; then
    sed -i 's/{MONGO_URL}/mongodb:\/\/127.0.0.1:27017\/damenu/' backend/.env
elif [[ $mode = 'docker' ]]; then
    sed -i 's/{MONGO_URL}/mongodb:\/\/damenu-mongo:27017\/damenu/' backend/.env
fi