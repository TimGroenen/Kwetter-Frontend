# build
FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# package
FROM nginx:alpine
COPY --from=build /app/dist/kwetter-frontend /usr/share/nginx/html
EXPOSE 80