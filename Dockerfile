# Base image
FROM node:16-alpine

# Create tmp directory
WORKDIR /code/tmp

# Install the application's dependencies into the node_modules's tmp directory.
COPY ./backend/package*.json ./
RUN npm install

# Switch to define working directory
WORKDIR /code/app

# Define entrypoint
COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD [ "npm", "run", "serve" ]