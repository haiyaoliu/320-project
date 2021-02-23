FROM node:10-alpine

# Set working directory
WORKDIR /usr/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .
