FROM node:16 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
# COPY package-lock.json /app
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build --prod

# FROM nginx:mainline
FROM nginxinc/nginx-unprivileged:mainline-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist/ice /usr/share/nginx/html
EXPOSE 80

#docker build -t hub.bio.pune.cdac.in/dbt/ice-ui-service .