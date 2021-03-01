FROM node:15.10.0-buster as base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000

CMD ["npm", "run", "dev"]
