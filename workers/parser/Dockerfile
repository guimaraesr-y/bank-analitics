FROM node:20-alpine

WORKDIR /usr/src/parser

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

CMD ["node", "dist/main.js"]