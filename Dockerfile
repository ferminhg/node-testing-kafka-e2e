FROM node:22-alpine as development

RUN apk update && apk add --no-cache \
    git \
    openssh-client \
    bash \
    curl \
    docker \
    openrc

RUN rc-update add docker boot

WORKDIR /code
COPY --chown=node:dialout package.json yarn.lock tsconfig.json .prettierrc.json /code/
COPY --chown=node:dialout src /code/src
COPY --chown=node:dialout test /code/test
COPY --chown=node:dialout test-e2e /code/test-e2e
COPY --chown=node:dialout jest.config.js setup.jest.ts /code/

RUN mkdir -p /stage1/src/

RUN yarn install --pure-lockfile \
    --non-interactive \
    --ignore-optional && \
    yarn cache clean && \
    yarn build && \
    cp /code/package.json /code/yarn.lock /stage1/ && \
    cp -r /code/build /stage1/ && \
    cp -r /code/node_modules /stage1/node_modules

FROM node:22-alpine as release

WORKDIR /code

COPY --from=development --chown=node:dialout /stage1 /code

CMD ["node", "build/src/infrastructure/server.js"]
