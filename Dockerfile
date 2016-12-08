FROM nginx
COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY dist/prod /usr/share/nginx/html
EXPOSE 80
