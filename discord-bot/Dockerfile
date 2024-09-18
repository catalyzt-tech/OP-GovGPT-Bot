# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml ./

# Install PNPM globally and install dependencies, including dotenv
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm add dotenv

# Copy the rest of the project files to the container
COPY . .

# Expose the application port
EXPOSE 3000

# Build the application
RUN pnpm build

# Command to run the application
CMD ["pnpm", "dev"]
