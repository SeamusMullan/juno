# Juno

> A modern solution to making JUCE projects.
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

```text
├── frontend/        # Electron/Vite frontend
├── backend/         # Python/FastAPI backend
└── package.json     # Root package.json for scripts
```

## Contributing

### Our Motto

Knowledge should be free and accessible to everyone. No exceptions.

### Contribution

If you would like to contribute, please fork this repo and make pull requests to it. The owners will decide if your changes get included (or may provide you with some changes to make first).

The general guidelines are the basics really..

- KISS (Keep it simple, stupid)
- DRY (Don't repeat yourself)
- Brackets on the same lines as functions
- Don't comment out code, just delete it. We use Git for a reason
- Be logical with your comments, no need for a whole narrative. Funny ones are allowed though.
- Swearing is ok, it probably means you know what you're doing

On the topic of knowing what you're doing:

I (hi it's Seamus talking now) personally believe that if you can only code with AI, you can't code, but you can prompt. I have nothing against people who want to help and try to vibe-code solutions, but keep this in mind.

If you create a PR that is looks suspiscious or *reaks* of AI, don't be surprised if we ask you how it works.

**If you can't explain, it doesn't get put in our codebase.** Simple ain't it?

Why? Well I'm glad you (probably) asked.

The code we maintain needs to stay at some standard, using AI makes that much harder. I'm not saying all AI code is bad, but at least know what it does before shovelling thousands of lines our direction. Smaller, more meaningful PRs are *way* more likely to be merged sooner and generally cause less problems when merging too!

### Thanks

Thanks to all the people who have interest in this project, have starred it or have helped us in some other way, it's awesome that you think this should exist :)

## License

This project is licensed under the MIT License.
