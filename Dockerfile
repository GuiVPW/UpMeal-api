FROM node:14-alpine AS build

WORKDIR /usr/src/app/

COPY package.json yarn.lock

RUN yarn

COPY . .

RUN yarn build

FROM node:14-alpine AS deploy

COPY --from=build package.json yarn.lock ./

RUN yarn

COPY dist .

EXPOSE 3000

CMD ["yarn", "start"]
