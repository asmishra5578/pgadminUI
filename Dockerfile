# Use the official Node.js 20 image as the base image

FROM node:10
# FROM --platform=linux/amd64 node:20
# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app
# RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]