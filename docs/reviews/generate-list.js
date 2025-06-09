#!/usr/bin/env node

/**
 * Generate a dynamic list of code reviews from the all/ directory
 * This script can be run manually or as part of a build process
 */

const fs = require('fs');
const path = require('path');

const REVIEWS_DIR = path.join(__dirname, 'all');
const OUTPUT_FILE = path.join(__dirname, 'list.md');

function parseDate(filename) {
  // Parse date from filename format: DD_Month_YYYY_title.md
  const dateMatch = filename.match(/^(\d{1,2})_([A-Za-z]+)_(\d{4})/);
  
  if (!dateMatch) {
    console.warn(`Could not parse date from filename: ${filename}`);
    return new Date(); // fallback to current date
  }
  
  const [, day, month, year] = dateMatch;
  const monthNames = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  const monthIndex = monthNames[month];
  if (monthIndex === undefined) {
    console.warn(`Unknown month in filename: ${month}`);
    return new Date();
  }
  
  return new Date(parseInt(year), monthIndex, parseInt(day));
}

function extractMetadata(content) {
  const metadata = {};
  
  // Extract title
  const titleMatch = content.match(/^#\s*(.+)$/m);
  metadata.title = titleMatch ? titleMatch[1].trim() : 'Untitled Review';
  
  // Extract reviewer
  const reviewerMatch = content.match(/\*Reviewer:\s*(.+?)\*/);
  metadata.reviewer = reviewerMatch ? reviewerMatch[1].trim() : 'Unknown';
  
  // Extract subject
  const subjectMatch = content.match(/\*Subject:\s*(.+?)\*/);
  metadata.subject = subjectMatch ? subjectMatch[1].trim() : 'Unknown';
  
  // Extract AI model info
  const modelMatch = content.match(/Model:\s*(.+?)(?:\n|$)/m);
  metadata.model = modelMatch ? modelMatch[1].trim() : null;
  
  // Extract a brief summary from the first paragraph after the metadata, excluding headers
  const summaryMatch = content.match(/---\s*\n\n(.+?)(?:\n\n|\n#)/s);
  if (summaryMatch) {
    let summary = summaryMatch[1].trim();
    // Remove any headers (lines starting with #)
    summary = summary.replace(/^#{1,6}\s*.+$/gm, '').trim();
    // Remove any markdown formatting
    summary = summary.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
    // Take first sentence or 200 chars, whichever is shorter
    const firstSentence = summary.match(/^[^.!?]*[.!?]/);
    if (firstSentence && firstSentence[0].length < 200) {
      metadata.summary = firstSentence[0].trim();
    } else {
      metadata.summary = summary.substring(0, 200) + '...';
    }
  } else {
    metadata.summary = '';
  }
  
  return metadata;
}

function generateMarkdown(reviews) {
  let markdown = `# Code Reviews

This page automatically lists all code reviews from the reviews directory, sorted by date (newest first).

*Last updated: ${new Date().toLocaleString()}*

---

`;

  if (reviews.length === 0) {
    markdown += 'No reviews found.\n\n';
  } else {
    // Add summary stats
    markdown += `## Summary

- **Total Reviews:** ${reviews.length}
- **Latest Review:** ${reviews[0].date.toLocaleDateString()}
- **Oldest Review:** ${reviews[reviews.length - 1].date.toLocaleDateString()}

---

## Reviews

`;

    reviews.forEach((review, index) => {
      const dateStr = review.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      markdown += `### ${index + 1}. [${review.title}](reviews/all/${review.filename})

**Date:** ${dateStr}  
**Reviewer:** ${review.reviewer}  
**Subject:** ${review.subject}  
`;
      
      if (review.model) {
        markdown += `**AI Model:** ${review.model}  `;
      }
      
      if (review.summary) {
        markdown += `

${review.summary}
`;
      }
      
      markdown += `

[📖 Read Full Review](reviews/all/${review.filename}) | [🔗 Direct Link](reviews/all/${review.filename})

---

`;
    });
  }

  // Add instructions for adding new reviews
  markdown += `## Quick Start

To add a new review, create a markdown file in the \`all/\` directory using the format \`DD_Month_YYYY_title.md\` and run \`npm run docs:reviews\`.

📚 [Full Documentation](reviews/DOCUMENTATION.md) | 🌐 [Web Interface](reviews/index.html)
`;

  return markdown;
}

function main() {
  try {
    console.log('📚 Generating reviews list...');
    
    // Check if reviews directory exists
    if (!fs.existsSync(REVIEWS_DIR)) {
      console.error(`❌ Reviews directory not found: ${REVIEWS_DIR}`);
      process.exit(1);
    }
    
    // Read all markdown files from the reviews directory
    const files = fs.readdirSync(REVIEWS_DIR)
      .filter(file => file.endsWith('.md'))
      .sort();
    
    console.log(`📁 Found ${files.length} review files`);
    
    const reviews = [];
    
    // Process each review file
    for (const filename of files) {
      console.log(`📄 Processing: ${filename}`);
      
      const filePath = path.join(REVIEWS_DIR, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      const metadata = extractMetadata(content);
      const date = parseDate(filename);
      
      reviews.push({
        filename,
        date,
        ...metadata
      });
    }
    
    // Sort by date (newest first)
    reviews.sort((a, b) => b.date - a.date);
    
    // Generate markdown content
    const markdown = generateMarkdown(reviews);
    
    // Write to output file
    fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');
    
    console.log(`✅ Generated reviews list: ${OUTPUT_FILE}`);
    console.log(`📊 Total reviews: ${reviews.length}`);
    
    if (reviews.length > 0) {
      console.log(`📅 Date range: ${reviews[reviews.length - 1].date.toLocaleDateString()} to ${reviews[0].date.toLocaleDateString()}`);
    }
    
  } catch (error) {
    console.error('❌ Error generating reviews list:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, parseDate, extractMetadata, generateMarkdown };
