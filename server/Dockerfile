FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

COPY .env .env

EXPOSE 3000

CMD ["npm", "start"]