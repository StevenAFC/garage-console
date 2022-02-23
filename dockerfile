FROM node:lts as builder

# Set work directory to /app
WORKDIR /app

# Copy required files to build application
COPY package.json .
COPY yarn.lock .
# Install dependencies
RUN yarn install

COPY src src
COPY public public
COPY .env .


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

# Install serve
RUN yarn global add serve

EXPOSE 5000

# Execute application
CMD serve -s build -l 5000
