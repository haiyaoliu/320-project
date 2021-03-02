FROM node:10-alpine

# Set working directory
WORKDIR /usr/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copy source files
COPY . .
