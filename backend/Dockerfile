# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port (matches .env PORT)
EXPOSE 4000

# Start the backend server
CMD ["npm", "start"]