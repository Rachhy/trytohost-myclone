# Stage 1
FROM node:18-alpine as node

# Get Variables
ARG API_BASE_URL
ARG FILE_BASE_URL
ARG SOCKET_URL

WORKDIR /usr/app
RUN npm uninstall ws
COPY ./package.json /usr/app/package.json
COPY ./package-lock.json /usr/app/package-lock.json

# Install Dependencies
RUN npm install --legacy-peer-deps

COPY ./ /usr/app

# Increase Node heap memory limit before build
ENV NODE_OPTIONS=--max_old_space_size=2048

# Build
RUN npm run build --prod

# Stage 2
FROM nginx:1.15.8-alpine

COPY --from=node /usr/app/dist /usr/share/nginx/html