FROM node:12
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8888
CMD [ "node", "index.js" ]
