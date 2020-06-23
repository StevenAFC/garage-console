FROM node:current as builder

# Set work directory to /app
WORKDIR /app

# File Author / Maintainer
LABEL authors="Steven Beeching <steven.beeching@gmail.com>"

# Expect API_SERVER argument
ARG API_SERVER

RUN echo "Oh dang look at that $API_SERVER"

# Copy required files to build application
COPY src src
COPY public public
#COPY package-lock.json .
COPY package.json .

# Install dependencies
RUN npm install

# Build application
RUN npm run-script build

# Create new image
FROM node:current

# Set work directory to /app
WORKDIR /app

# Copy required files
# COPY package-lock.json .
COPY package.json .
COPY --from=builder /app/build build

# Set environment to production
ENV NODE_ENV production
ENV REACT_APP_API_SERVER_IP $API_SERVER

# Install dependencies
RUN npm install
RUN npm install -g serve

EXPOSE 5000

# Execute application
CMD serve -s build
