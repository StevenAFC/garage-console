FROM node:lts as builder

# Set work directory to /app
WORKDIR /app

# Expect API_SERVER argument
ARG API_SERVER

# Copy required files to build application
COPY src src
COPY public public
#COPY package-lock.json .
COPY package.json .
COPY yarn.lock .
COPY .env .

# Install dependencies
RUN yarn install

# Build application
RUN yarn build

# Create new image
FROM node:lts

# Set work directory to /app
WORKDIR /app

# Copy required files
# COPY package-lock.json .
# COPY package.json .
COPY --from=builder /app/build build

# Set environment to production
ENV NODE_ENV production
ENV REACT_APP_API_SERVER_IP $API_SERVER

# Install serve
RUN yarn global add serve

EXPOSE 5000

# Execute application
CMD serve -s build -l 5000
