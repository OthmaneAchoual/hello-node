FROM node:12-alpine

RUN mkdir -p /app/src

COPY package.json /app/src

WORKDIR /app/src

RUN npm install

COPY . /app/src

EXPOSE 3000

CMD ["npm", "start"]
