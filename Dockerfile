FROM node:18-alpine

RUN apk update && apk add --no-cache ffmpeg
