FROM node:alpine
RUN apk add python build-base imagemagick p7zip

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install 

VOLUME /data
EXPOSE 3000

COPY . .
RUN mkdir thumbnails cache
RUN chown -R node /usr/src/app
USER node
CMD [ "npm", "run","dev" ]
