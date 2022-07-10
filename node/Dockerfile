FROM node:15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

RUN apt-get update && apt-get install -y wget && npm install pm2 -g && pm2 update

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

# RUN pm2 start /usr/src/app/index.js --name Index

CMD ["node","/usr/src/app/index.js"]