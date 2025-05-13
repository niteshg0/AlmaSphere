# Alumni Association Portal

A full-stack application for managing alumni connections, sharing job opportunities, and more.

## Project Structure

- `/frontend` - React frontend built with Vite
- `/backend` - Express.js backend API

## Environment Setup

This project uses environment variables for configuration. Example files are provided:

- `frontend/.env.example`
- `backend/.env.example`

Copy these files to create your own `.env` files:

```bash
# For frontend
cp frontend/.env.example frontend/.env

# For backend
cp backend/.env.example backend/.env
```

Then edit the `.env` files to add your specific configuration values.

## Development Setup

### Prerequisites

- Node.js 16+
- MongoDB

### Installing Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install
```

### Running the Development Server

```bash
# Run both frontend and backend in development mode
npm run dev

# Run only frontend
npm run frontend

# Run only backend
npm run backend
```

### Building for Production

```bash
# Build frontend
cd frontend
npm run build
```

## Deployment

The application consists of two separate deployments:

1. Frontend: Deployed on Render.com at https://alumni-1gbt.onrender.com
2. Backend: Deployed on Render.com at https://alumni-backend-8eqk.onrender.com

### Environment Variables for Production

When deploying, make sure to set these environment variables:

#### Backend

- `MONGO_URL` - MongoDB connection string
- `SECRET_KEY` - JWT secret key
- `NODE_ENV` - Set to "production"

#### Frontend

- `VITE_BACKEND_URL` - URL of the deployed backend API

## Security Notes

- Never commit `.env` files or any files containing sensitive information
- Use environment variables for all configuration
- Make sure all API endpoints are properly secured with authentication where needed
