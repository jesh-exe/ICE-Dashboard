FROM nginx:1.26.0-alpine
# FROM nginxinc/nginx-unprivileged:mainline-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ice /usr/share/nginx/html

COPY 404.html /usr/share/nginx/error/404.html
COPY ca.crt /usr/share/nginx/html
EXPOSE 80

