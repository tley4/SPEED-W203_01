#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Installing Node.js..."
    # Install Node.js (Using NVM for cross-platform installation)
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    nvm install --lts
else
    echo "Node.js is already installed."
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm manually."
    exit 1
else
    echo "npm is already installed."
fi

# Install MongoDB (optional, if MongoDB is required to be installed locally)
if ! command -v mongod &> /dev/null
then
    echo "MongoDB is not installed. Please install MongoDB manually."
    # If you want to automate MongoDB installation, it depends on the OS. For Ubuntu:
    # wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
    # echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    # sudo apt update
    # sudo apt install -y mongodb-org
else
    echo "MongoDB is already installed."
fi

# Install frontend dependencies (Next.js)
echo "Installing frontend dependencies..."
cd frontend
npm install

# Install backend dependencies (Nest.js)
echo "Installing backend dependencies..."
cd ../backend
npm install

# Optional: Create .env files for backend/frontend
if [ ! -f "../frontend/.env" ]; then
    echo "Creating frontend .env file..."
    cat <<EOT >> ../frontend/.env
NEXT_PUBLIC_API_URL=http://localhost:3000
EOT
fi

if [ ! -f "../backend/.env" ]; then
    echo "Creating backend .env file..."
    cat <<EOT >> ../backend/.env
MONGO_URI=mongodb://localhost:27017/mydatabase
PORT=3000
EOT
fi

# Final setup instructions
echo "Setup complete."
echo "Run the following commands to start the project:"
echo "  1. Start MongoDB if you're running it locally: 'mongod'"
echo "  2. In two terminal windows, run the following:"
echo "     - cd frontend && npm run dev  (to start the Next.js frontend)"
echo "     - cd backend && npm run start (to start the Nest.js backend)"
