FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .


EXPOSE 5001


CMD ["npm", "run", "dev"]
