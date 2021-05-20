FROM node:15.10.0-buster

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000

CMD ["npm", "run", "dev"]
