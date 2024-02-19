FROM node:21-alpine

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

CMD [ "pnpm", "start" ]