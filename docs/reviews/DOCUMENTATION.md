# Review System Documentation

This documentation covers how to use and maintain the dynamic code review system.

## Overview

The review system automatically generates and maintains a list of code reviews from markdown files in the `all/` directory, with proper sorting by date from filenames.

## Adding New Reviews

To add a new review:

1. Create a markdown file in the `all/` directory
2. Use the naming format: `DD_Month_YYYY_title-description.md`
3. Run `npm run docs:reviews` to update the list
4. Include these metadata fields in your review:

```markdown
# Review Title

*Date: Month Day, Year*  
*Reviewer: Your Name/Role*  
*Subject: What was reviewed*

---

## Review Content...
```

## File Naming Convention

Files should follow this pattern: `DD_Month_YYYY_title-description.md`

Examples:
- `9_June_2025_frontend-criticism.md`
- `15_March_2024_security-audit.md`
- `3_January_2025_performance-review.md`

## Metadata Fields

The following metadata is automatically extracted from your review files:

- **Title**: First H1 header (`# Title`)
- **Reviewer**: Text after `*Reviewer:` pattern
- **Subject**: Text after `*Subject:` pattern  
- **AI Model**: Text after `Model:` pattern (optional)
- **Summary**: First paragraph after `---` separator (auto-generated)

## Automation Options

### 1. Manual Generation
```bash
npm run docs:reviews
```

### 2. Watch Mode (Development)
```bash
npm run docs:watch-reviews
```

### 3. Git Hook
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/sh
npm run docs:reviews
git add docs/reviews/list.md
```

### 4. GitHub Actions
The repository includes a GitHub Actions workflow that automatically updates the review list when files are added to the `all/` directory.

### 5. File Watcher
```bash
npx nodemon --watch docs/reviews/all --ext md --exec "npm run docs:reviews"
```

## Directory Structure

```
docs/reviews/
├── all/                    # Individual review files
│   ├── 9_June_2025_frontend-criticism.md
│   └── 8_June_2025_backend-api-review.md
├── list.md                 # Auto-generated review list
├── index.html              # Web interface
├── generate-list.js        # Generation script
├── update-list.sh          # Shell script
├── README.md               # Basic documentation
└── DOCUMENTATION.md        # This file
```

## Troubleshooting

### Date Parsing Issues
- Ensure filename follows `DD_Month_YYYY_title.md` format
- Use full month names (January, February, etc.)
- Day can be 1-2 digits, year must be 4 digits

### Missing Metadata
- Check that metadata fields use exact patterns: `*Reviewer:`, `*Subject:`
- Ensure there's a `---` separator before content
- Verify H1 header exists for title extraction

### Generation Failures
- Run `node generate-list.js` directly to see detailed error messages
- Check file permissions in the `all/` directory
- Verify Node.js version (requires Node 12+)

### Docsify Integration
- Generated links use relative paths (`all/filename.md`)
- Ensure Docsify is configured to serve the `docs/` directory
- Check that `.nojekyll` file exists in docs root

## Web Interface

The `index.html` file provides a web-based interface with:
- Responsive card-based layout
- Statistics dashboard  
- Search and filtering capabilities
- Direct links to review files

Access it by opening `docs/reviews/index.html` in a browser or serving it through a web server.

## Scripts and Commands

Available NPM scripts:
- `npm run docs:reviews` - Generate review list once
- `npm run docs:watch-reviews` - Watch for changes and auto-regenerate

Shell scripts:
- `./update-list.sh` - Manual update script
- Works with cron jobs for scheduled updates

## Contributing

When adding new features to the review system:

1. Test with multiple review files
2. Verify date parsing edge cases
3. Check Docsify compatibility
4. Update this documentation
5. Test automation workflows

## Integration with Documentation Systems

### Docsify
- Place in `docs/` directory structure
- Configure sidebar to include `reviews/list.md`
- Use relative paths for navigation

### GitBook
- Import `list.md` as a chapter
- Configure build process to run generation script

### VuePress/Vitepress
- Include generation script in build pipeline
- Configure routing for review files

### GitHub Pages
- Use GitHub Actions workflow for automatic updates
- Ensure generated files are committed to repository
