# Use the official Node.js LTS Alpine image for a lightweight container
FROM docker.io/node:lts-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Install dependencies
RUN yarn --omit=dev --force install

# Copy built application files (dist)
COPY dist server/

# Use a smaller runtime image
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

# Create a non-root user for security
RUN addgroup --system server && \
    adduser --system -G server server

# Copy dependencies from the build stage
COPY --from=build /app/server ./server
COPY --from=build /app/package.json ./server
COPY --from=build /app/node_modules ./server/node_modules

# Change ownership to the non-root user
RUN chown -R server:server /app

# Switch to non-root user
USER server

# Start the application
CMD ["node", "server/main.js"]
