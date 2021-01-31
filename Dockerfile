# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN yarn install

# Copy all files
COPY ./ ./

# Build app
RUN yarn build

# Expose the listening port
EXPOSE 80

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
ENV TZ=America/Sao_Paulo
RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates
RUN apk add --update tzdata
RUN rm -rf /var/cache/apk/*

USER node

# Run npm start script when container starts
CMD [ "yarn", "start" ]
