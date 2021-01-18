FROM node:12
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "index.js" ]
