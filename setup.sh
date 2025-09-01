#!/bin/bash

# Me-API Playground Setup Script
echo "🚀 Setting up Me-API Playground..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Setup Backend
echo "📦 Setting up backend..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Create .env file from example
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please update the .env file with your database credentials"
else
    echo "ℹ️  .env file already exists"
fi

cd ..

# Setup Frontend
echo "📦 Setting up frontend..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your PostgreSQL database"
echo "2. Update backend/.env with your database credentials"
echo "3. Run the database schema: psql -d your_database -f database/schema.sql"
echo "4. Seed the database: psql -d your_database -f database/seed.sql"
echo "5. Start the backend: cd backend && npm run dev"
echo "6. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Backend will run on: http://localhost:3001"
echo "🌐 Frontend will run on: http://localhost:5173"
echo ""
echo "📚 Check README.md for detailed documentation"


