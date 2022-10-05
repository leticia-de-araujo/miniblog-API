FROM node:16.16.0

RUN apt update

ENV PORT=3001

EXPOSE 3001

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]