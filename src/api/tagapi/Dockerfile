FROM node:16.13.0-alpine

WORKDIR "/app"
COPY ./tagapi/package.json ./
RUN npm install
COPY ./tagapi .
RUN npm run build

EXPOSE 3000
CMD ["npm","start"]
