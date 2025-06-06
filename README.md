# Ampere Project

This project was created with [Ampere](https://github.com/SeamusMullan/ampere).

## Getting Started

### Prerequisites

- Node.js 16+
- Python 3.11+
- npm or yarn

### Installation

```bash
# Install dependencies
npm run install:all

# Setup Python environment
cd backend
uv sync
uv pip install -r requirements.txt
```

### Development

```bash
# Start both frontend and backend
npm run dev

# Or start them separately
npm run dev:frontend
npm run dev:backend
```

## Project Structure

```
├── frontend/        # Electron/Vite frontend
├── backend/         # Python/FastAPI backend
└── package.json     # Root package.json for scripts
```

## License

This project is licensed under the MIT License.
