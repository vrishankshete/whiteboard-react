FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY ./build ./server.js ./

EXPOSE 3001

CMD [ "npm", "start" ]