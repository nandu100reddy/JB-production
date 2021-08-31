FROM node:latest

MAINTAINER Abhishek Modi 

RUN echo "Tryin to build my first application"

RUN npm install

WORKDIR /var/www

COPY . /var/www

EXPOSE 3000

ENTRYPOINT ["npm","start"]
