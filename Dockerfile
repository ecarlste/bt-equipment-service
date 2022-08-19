FROM node:16.16.0-alpine3.16

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml tsconfig.json ./
COPY .yarn/ ./.yarn
COPY src ./src

RUN yarn install
RUN yarn build

FROM node:16.16.0-alpine3.16

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

RUN yarn plugin import workspace-tools
RUN yarn workspaces focus --production

COPY --from=0 /usr/src/app/dist .

ENV PORT 8080
EXPOSE ${PORT}

CMD [ "node", "app.js" ]
