FROM node:18-alpine AS builder

RUN mkdir /app

WORKDIR /app

COPY ./package* /app/

RUN npm ci

COPY ./ /app/

RUN npm run build


FROM tothadi/node18-alpine-ffmpeg:ffmpeg

RUN apk update && apk add --no-cache tzdata

ENV TZ=Europe/Budapest
ENV LANG hu_HU.UTF-8
ENV LANGUAGE hu_HU.UTF-8
ENV LC_ALL hu_HU.UTF-8

ENV NODE_ENV=production

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir /app

WORKDIR /app

COPY ./package* /app/

RUN npm ci

COPY --from=builder /app/dist /app/dist

CMD ["npm", "start"]
