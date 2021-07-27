FROM node:14

WORKDIR /app
COPY package.json /app
RUN npm install
COPY /src /app/src
RUN npm run build
CMD node dist/index.js
