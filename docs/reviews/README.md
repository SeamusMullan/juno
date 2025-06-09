# Code Reviews System

This directory contains an automated system for managing and displaying code reviews.

## Structure

```
reviews/
├── list.md                 # Auto-generated list of all reviews
├── generate-list.js        # Script that generates the list
├── update-list.sh         # Convenience script to update the list
├── README.md              # This file
└── all/                   # Directory containing all review files
    └── DD_Month_YYYY_title.md
```

## How It Works

### 1. File Naming Convention

Review files must follow this naming pattern:
```
DD_Month_YYYY_title-description.md
```

Examples:
- `9_June_2025_frontend-criticism.md`
- `15_December_2024_backend-api-review.md`
- `01_January_2026_security-audit.md`

### 2. Review File Format

Each review should include metadata at the top:

```markdown
# Review Title

*Date: Month Day, Year*  
*Reviewer: Your Name/Role*  
*Subject: What was reviewed*

---

## LLM Info (if applicable)

Model: AI Model Name
Prompt: The prompt used

## Review Content

Your detailed review content goes here...
```

### 3. Automatic List Generation

The system automatically:
- Scans the `all/` directory for markdown files
- Extracts metadata from each file
- Sorts reviews by date (newest first)
- Generates a formatted list in `list.md`

## Usage

### Adding a New Review

1. Create a new `.md` file in the `all/` directory with the proper naming format
2. Include the required metadata at the top
3. Update the list using one of these methods:

#### Method 1: NPM Script (Recommended)
```bash
npm run docs:reviews
```

#### Method 2: Direct Node.js
```bash
cd docs/reviews
node generate-list.js
```

#### Method 3: Shell Script
```bash
cd docs/reviews
./update-list.sh
```

### Watching for Changes

To automatically update the list when files change:
```bash
npm run docs:watch-reviews
```

This will watch the `all/` directory and regenerate the list whenever a `.md` file is added, modified, or removed.

## Automation

### GitHub Actions

The repository includes a GitHub Action (`.github/workflows/update-reviews-list.yml`) that automatically:
- Triggers when files in `docs/reviews/all/` are modified
- Runs the list generation script
- Commits the updated `list.md` file

### Local Git Hooks

You can set up a pre-commit hook to automatically update the list:

```bash
# Create .git/hooks/pre-commit
#!/bin/sh
cd docs/reviews && node generate-list.js
git add docs/reviews/list.md
```

## Features

### Generated List Includes:
- Review title and direct link
- Review date (parsed from filename)
- Reviewer information
- Subject being reviewed
- AI model information (if applicable)
- Brief summary/excerpt
- Summary statistics

### Sorting and Organization:
- Reviews sorted by date (newest first)
- Automatic date parsing from filenames
- Clean, consistent formatting
- Mobile-responsive display

## Troubleshooting

### Common Issues:

1. **Date not parsing correctly**
   - Ensure filename follows exact format: `DD_Month_YYYY_title.md`
   - Use full month names (January, February, etc.)
   - Use two-digit days (01, 02, ..., 31)

2. **Metadata not extracting**
   - Check that metadata follows the exact format shown above
   - Ensure asterisks and colons are in the right places
   - Verify there's a `---` separator after metadata

3. **Script not finding files**
   - Ensure you're running from the correct directory
   - Check that `.md` files are in the `all/` subdirectory
   - Verify file permissions

### Manual Debugging:

```bash
# Test the script
cd docs/reviews
node -e "console.log(require('./generate-list.js'))"

# Check what files are found
ls -la all/

# Test date parsing
node -e "
const { parseDate } = require('./generate-list.js');
console.log(parseDate('9_June_2025_test.md'));
"
```

## Future Enhancements

Potential improvements:
- [ ] Add tags/categories support
- [ ] Include review ratings/scores
- [ ] Generate RSS feed for reviews
- [ ] Add search functionality
- [ ] Include reviewer avatars
- [ ] Add review templates for different types
- [ ] Integration with issue tracking systems
- [ ] Automated metrics and analytics

## Contributing

When contributing reviews:
1. Follow the naming convention strictly
2. Include all required metadata
3. Write clear, constructive feedback
4. Update the list after adding your review
5. Consider the tone and helpfulness of your feedback

---

*This system was designed to make code reviews more organized, discoverable, and trackable over time.*
