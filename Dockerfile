# Use the official Playwright image as the base
FROM mcr.microsoft.com/playwright:v1.49.1-noble

# Set the working directory inside the container
WORKDIR /app

# Copy the application code into the container
COPY . .

RUN apt-get update && apt-get upgrade -y

# Install dependencies
RUN npm install

# Install Playwright system dependencies (only if needed)
RUN npx playwright install-deps

# Expose a port if needed (adjust if necessary)
EXPOSE 3000

# Default command to run tests
CMD ["npm", "test"]
