FROM node:alpine
# 安装 node-sass 需要 python build-base，解压工具 p7zip
RUN apk add --no-cache python build-base imagemagick p7zip

WORKDIR /usr/src/app
COPY package.json ./

#安装node依赖
RUN npm install --no-progress

#安装程序
COPY . .
RUN mkdir thumbnails cache
RUN chown -R node /usr/src/app
USER node

VOLUME /data
EXPOSE 3000
CMD [ "npm", "run","dev" ]
