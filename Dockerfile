FROM node:16.16.0-alpine3.16

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn

# RUN yarn plugin import workspace-tools
# RUN yarn workspaces focus --production

RUN yarn install

COPY . .

RUN yarn build

ENV PORT 8080
EXPOSE ${PORT}

CMD [ "yarn", "start" ]
