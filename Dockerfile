FROM node:latest

MAINTAINER Abhishek Modi 

RUN echo "Tryin to build my first application"

WORKDIR /var/www

RUN npm install

COPY . /var/www

EXPOSE 3000

ENTRYPOINT ["npm","start"]
