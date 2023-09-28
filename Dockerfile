# Use the latest Node.js LTS version as a parent image
FROM node:lts

# Create and set the working directory in the container
WORKDIR /usr/app

# Copy the entire application code to the working directory
COPY . .

# Install application dependencies
RUN npm install

# Expose the port on which your Express application will run (replace 3000 with your application's port if needed)
EXPOSE 3000

# Define the command to start your Express application
CMD ["node", "app.js"]
