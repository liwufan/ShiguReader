FROM node:alpine AS build
# 安装 node-sass 需要 python build-base
WORKDIR /usr/src/app
COPY . .
RUN apk add --no-cache python build-base && \
npm install --no-progress && \
npm install pkg && \
npm run build\
./node_modules/.bin/pkg  src/server/index.js -t node14-linux-x64 --output ShiguReader

RUN mkdir Shigubin\
mv ShiguReader Shigubin/ShiguReader\
cp -R dist Shigubin\
cp -R public Shigubin\
cp -R resource Shigubin\
cp etc-config.ini Shigubin\
cp path-config.ini Shigubin\
cp move-path-config.ini Shigubin

#二次打包
FROM node:alpine
WORKDIR /usr/src/app
COPY --chown=node --from=build /usr/src/app/Shigubin .
# 解压工具 缩图软件
RUN apk add --no-cache imagemagick p7zip && chown -R node /usr/src/app
# RUN chown -R node /usr/src/app

USER node
VOLUME /data
EXPOSE 3000
CMD [ "/usr/src/app/ShiguReader" ]
