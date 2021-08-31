FROM node:latest

MAINTAINER Abhishek Modi 

RUN echo "Tryin to build my first application"

WORKDIR /var/www

COPY . /var/www

RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm","start"]
