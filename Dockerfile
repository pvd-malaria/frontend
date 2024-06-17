# build
FROM node:18-alpine as build
RUN apk add --no-cache --virtual .builds-deps build-base python3 make g++
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY . ./
RUN yarn && yarn build

# nginx
FROM nginx:stable-alpine as run
RUN mkdir -p /etc
COPY --from=build /app/build /etc/static
COPY certs /etc/certs
WORKDIR /etc/static
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
EXPOSE 8787
CMD ["nginx", "-g", "daemon off;"]
