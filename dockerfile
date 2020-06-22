FROM node:9 as builder

# Set work directory to /app
WORKDIR /app

# File Author / Maintainer
LABEL authors="Steven Beeching <steven.beeching@gmail.com>"

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
FROM node:11

# Set work directory to /app
WORKDIR /app

# Copy required files
# COPY package-lock.json .
COPY package.json .
COPY --from=builder /app/build build

# Set environment to production
ENV NODE_ENV production

# Install dependencies
RUN npm install
RUN npm install -g serve

EXPOSE 5000

# Execute application
CMD serve -s build
