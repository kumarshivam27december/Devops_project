FROM node:18-alpine

# Set environment variable to fix OpenSSL issue
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]