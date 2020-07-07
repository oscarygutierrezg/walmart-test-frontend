FROM nginx:alpine
COPY /dist/tesfrontend /usr/share/nginx/html
EXPOSE 80
