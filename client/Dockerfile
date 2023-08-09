FROM node:18-alpine AS builder

ENV NODE_ENV=production

RUN mkdir /app && chown node:node /app
RUN npm i -g @angular/cli

USER node
WORKDIR /app

COPY --chown=node ./client/package* /app/
COPY --chown=node ./client/angular.json /app/
RUN npm ci

COPY --chown=node ./client/src /app/src

RUN npm run build


FROM nginx:1.23-alpine


RUN apk add --no-cache tzdata

ENV TZ=Europe/Budapest
ENV LANG hu_HU.UTF-8
ENV LANGUAGE hu_HU.UTF-8
ENV LC_ALL hu_HU.UTF-8
ENV NODE_ENV=production

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /srv/http

COPY client/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /srv/http

HEALTHCHECK --interval=15s \
    CMD wget -O/dev/null http://localhost || exit 1
