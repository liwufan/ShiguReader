FROM node:alpine AS build
# 安装 node-sass 需要 python build-base
WORKDIR /usr/src/app
COPY . .
RUN apk add --no-cache python build-base && \
npm install --no-progress && \
npm run build


#二次打包
FROM node:alpine
WORKDIR /usr/src/app
# 解压工具 缩图软件
RUN apk add --no-cache imagemagick p7zip
COPY --chown=node --from=build /usr/src/app .
# RUN chown -R node /usr/src/app

USER node
VOLUME /data
EXPOSE 3000
CMD [ "npm", "run","start-production" ]
