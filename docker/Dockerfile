FROM node as angular-build
WORKDIR /frontend
COPY . /frontend
RUN ls -la
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=angular-build /frontend/dist/itm-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]