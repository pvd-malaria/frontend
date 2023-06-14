# build
FROM node:18-alpine as build
RUN apk install --no-cache --virtual .builds-deps build-base python3 make g++
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY . ./
RUN yarn && yarn build

# nginx
FROM nginx:stable-alpine as run
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
