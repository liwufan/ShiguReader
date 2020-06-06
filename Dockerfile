FROM node:alpine
RUN apk add python build-base imagemagick p7zip

WORKDIR /usr/src/app
COPY . .
RUN npm install 

VOLUME /data
VOLUME /usr/src/app/workspace

EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD [ "npm", "run","dev" ]
