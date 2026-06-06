# === STAGE 1: Build the Single Master Benchmark App ===
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency structures from root
COPY package*.json ./
RUN npm install

# Copy all code assets
COPY . .

# Run the single production build
RUN npm run build

# === STAGE 2: Serve the Bundle over Nginx ===
FROM nginx:alpine

# Add curl to support the automated healthcheck script
RUN apk add --no-cache curl

# Delete default Nginx files and copy your compiled distribution
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html/

# Expose server port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]