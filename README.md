# damenu
QR Digital Menu Maker crafted with NestJS and VueJS.

## Prerequisite
- Node.js
- Docker
- Docker Compose v2

## Setup

Initial Setup
```
# Install lerna & husky
npm install
```

There are 2 mode to run this project.

#### 1. Docker mode

```bash
# Ensure you are in root directory

# Setup .env
bash development.sh docker

# Spin up backend and mongo container
docker compose up -d

# Boot up frontend
cd frontend
npm install
npm run serve
```

Note: Eventhough `lerna` is not utilized for initialization in `docker` mode, it is used for `husky` hook to perform code sniffing both repository on `git commit` .

#### 2. Monorepo mode

```bash
# Ensure you are in root directory

# Setup .env
bash development.sh monorepo

# Install npm packages for both frontend & backend
lerna exec npm install

# Boot up both frontend & backend
npm run serve
```