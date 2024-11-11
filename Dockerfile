# Use an official Node.js runtime as a parent image
FROM node:16.13.2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port that your app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "start"]

