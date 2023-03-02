# Use the official Node.js 14 image as the parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the React app
RUN npm run build

# Use the official Python 3.9 image as the parent image
FROM python:3.9

# Set the working directory to /app
WORKDIR /app

# Copy the requirements.txt file to the container
COPY /flask_server/requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the rest of the Flask app's source code to the container
COPY . .

# Set the environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Expose port 5000 for the Flask app
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]