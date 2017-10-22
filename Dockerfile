FROM node:4.2.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

ENV PORT 8888
EXPOSE 8888

ENTRYPOINT node server.js
