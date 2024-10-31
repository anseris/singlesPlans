FROM node:alpine AS builder
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
ARG configuration=production
RUN npm run build --configuration=$configuration
FROM nginx:latest AS nginx
COPY --from=builder /app/dist/singlesplans/browser /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf



