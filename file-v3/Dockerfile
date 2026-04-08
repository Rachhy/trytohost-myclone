FROM sovichea10/file-node:16-slim

ARG PORT=8080
WORKDIR /app
COPY package*.json ./
RUN npm install
# RUN npm install -g node-gyp && npm install --save-dev node-gyp
# RUN npm install --save node-poppler
COPY . .
RUN cp .env.example .env
EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]
