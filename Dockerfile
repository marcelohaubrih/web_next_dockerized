# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

RUN npm install --global pm2
# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

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
CMD [ "pm2-runtime", "npm", "--", "start" ]
