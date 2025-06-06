# Getting Started with Juno

Juno is a modern cross-platform desktop application built with Electron + React frontend and Python FastAPI backend. This guide will help you get up and running with the development environment.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher)
- **Python** (version 3.12 or higher)
- **uv** (Python package manager) - [Install uv](https://docs.astral.sh/uv/getting-started/installation/)
- **npm** or **yarn** (comes with Node.js)

### Installing uv (Python Package Manager)

Juno uses `uv` for fast Python package management. Install it using:

```bash
# On macOS and Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# On Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Or using pip
pip install uv
```

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/seamusmullan/juno.git
cd juno
```

### 2. Install All Dependencies

Use the convenient script to install both frontend and backend dependencies:

```bash
npm run install:all
```

This command will:

- Install root-level dependencies
- Set up the frontend (Electron + React)
- Create Python virtual environment and install backend dependencies

### 3. Start Development

Start both frontend and backend in development mode:

```bash
npm run dev
```

This will:

- Start the FastAPI backend server on `http://localhost:8000`
- Launch the Electron app with hot reload enabled
- Enable CORS for frontend-backend communication

## Manual Setup (Alternative)

If you prefer to set up components individually:

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
uv venv                    # Create virtual environment
uv sync                    # Install dependencies from pyproject.toml
uv pip install -r requirements.txt  # Install additional requirements
uv run fastapi dev main.py          # Start development server
```

## Project Structure

```text
juno/
├── frontend/              # Electron + React application
│   ├── src/
│   │   ├── main/         # Electron main process
│   │   ├── preload/      # Electron preload scripts
│   │   └── renderer/     # React frontend
│   ├── package.json
│   └── electron.vite.config.mjs
├── backend/               # FastAPI Python backend
│   ├── api/              # API route handlers
│   │   ├── data.py       # Data management endpoints
│   │   └── status.py     # Status and health endpoints
│   ├── core/             # Core configuration and models
│   ├── services/         # Business logic services
│   ├── main.py           # FastAPI application entry point
│   └── pyproject.toml    # Python dependencies
├── docs/                 # Documentation (Docsify)
└── package.json          # Root scripts and dependencies
```

## Available Scripts

### Root Level Commands

- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run install:all` - Install all dependencies
- `npm run build` - Build the frontend for production

### Frontend Commands

```bash
cd frontend
npm run dev              # Development mode
npm run build            # Build for production
npm run build:win        # Build Windows executable
npm run build:mac        # Build macOS executable
npm run build:linux      # Build Linux executable
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

### Backend Commands

```bash
cd backend
uv run fastapi dev main.py    # Development server with hot reload
uv run python main.py         # Run without FastAPI CLI
uv sync                       # Sync dependencies
uv add package-name           # Add new dependency
```

## API Endpoints

The backend provides several endpoints for testing and monitoring.
They can be viewed in the [API Documentation](api/getting-started.md)

### Example API Usage

```bash
# Health check
curl http://localhost:8000/status/health

# System performance
curl http://localhost:8000/status/performance

# API info
curl http://localhost:8000/status/info
```

## Development Features

### Hot Reload

- **Frontend**: Automatic reload when React components change
- **Backend**: FastAPI auto-reloads when Python files are modified
- **Electron**: Main process restarts when Electron files change

### CORS Configuration

The backend is configured to allow requests from the frontend during development. CORS settings can be found in `backend/main.py`.

### Environment Variables

Create a `.env` file in the `backend/` directory for environment-specific configuration:

```bash
# backend/.env
SOME_API_KEY=your_api_key_here
```

## Building for Production

### Frontend (Electron App)

Build platform-specific executables:

```bash
cd frontend

# Build for current platform
npm run build

# Platform-specific builds
npm run build:win     # Windows
npm run build:mac     # macOS
npm run build:linux   # Linux
```

### Backend (Python API)

For production deployment, consider:

1. Using a production ASGI server like Gunicorn
2. Setting up proper environment variables
3. Configuring CORS for your production domain

```bash
cd backend
uv run gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure no other applications are using ports 8000 (backend) or the Electron dev port
2. **Python version**: Ensure you're using Python 3.12 or higher
3. **Node version**: Ensure you're using Node.js 16 or higher
4. **uv not found**: Make sure `uv` is installed and in your PATH

### Useful Commands

```bash
# Check versions
node --version
python --version
uv --version

# Kill processes on specific ports (if needed)
lsof -ti:8000 | xargs kill -9  # Kill backend
```

### Getting Help

- Check the [main README](../README.md) for project overview
- Review the [contribution guidelines](../README.md#contributing)
- Open an issue on GitHub for bugs or feature requests

## Next Steps

Now that you have Juno running:

1. Explore the API endpoints using the browser or curl
2. Modify the React frontend in `frontend/src/renderer/src/`
3. Add new API endpoints in `backend/api/`
4. Check out the system performance monitoring features
5. Build your first feature!
