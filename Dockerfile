# build
FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY . ./
RUN yarn && yarn build
COPY ./build ./

# nginx
FROM nginx:stable-alpine as run
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]