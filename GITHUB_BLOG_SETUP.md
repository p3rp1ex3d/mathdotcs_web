# GitHub Blog Integration Setup Guide

Your Math.CS website is now configured to fetch blog content dynamically from GitHub. Follow these steps to get it working:

## Step 1: Create a GitHub Repository for Blog Content

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `math-cs-blog-content` (or your preferred name)
3. You can make it **public** or **private** (private requires authentication token)
4. Initialize with a README (optional)

## Step 2: Create Blog Post Files

In your GitHub repository, create markdown files with the following structure:

### File naming:
- Convert title to slug: `Your Post Title` → `your-post-title.md`
- Example: `understanding-binary-trees.md`

### File format (required frontmatter):
```markdown
---
title: Understanding Binary Trees
category: Data Structures
excerpt: A comprehensive guide to binary trees, their properties, and practical applications in computer science.
date: Mar 15, 2026
readTime: 8 min read
image: 🌳
author: Your Name
---

# Main Content Here

Your markdown content goes here...

## Subsection

More content...
```

### Supported frontmatter fields:
- **title** (required): Post title
- **category** (required): Category (e.g., "Mathematics", "Data Structures", "Algorithms", "Physics", "Chemistry")
- **excerpt** (required): Short description for listing pages
- **date** (required): Publication date (format: "Mar 15, 2026")
- **readTime** (required): Estimated read time (e.g., "8 min read")
- **image** (optional): Emoji or image path
- **author** (optional): Author name

## Step 3: Generate GitHub Personal Access Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click "Generate new token" (classic)
3. Give it a descriptive name: `Math.CS Blog`
4. **Select scopes:**
   - For public repos: Select `public_repo`
   - For private repos: Select `repo` (full repository access)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root (same level as `package.json`)
2. Add the following variables:

```env
VITE_GITHUB_OWNER=your-github-username
VITE_GITHUB_REPO=math-cs-blog-content
VITE_GITHUB_TOKEN=ghp_your_token_here
```

Replace with your actual values:
- `your-github-username`: Your GitHub username
- `math-cs-blog-content`: Your repository name
- `ghp_your_token_here`: Your personal access token

### For public repositories:
You can omit the `VITE_GITHUB_TOKEN` variable for public repos (optional).

## Step 5: Test the Integration

1. Save `.env.local`
2. Restart your development server
3. Navigate to the blog page or homepage
4. You should see your blog posts loading dynamically from GitHub

## Troubleshooting

### Articles not appearing?
- Check browser console for error messages
- Verify `.env.local` is in the project root
- Ensure environment variable names are exactly correct
- Check that markdown files are in the root of the GitHub repo (not in subdirectories)

### Getting rate limit errors?
- Make sure you've added your GitHub token to `.env.local`
- Public API calls without token: 60 requests/hour
- Authenticated requests: 5000 requests/hour

### Markdown not rendering correctly?
- Check that frontmatter is between `---` markers
- Ensure all required frontmatter fields are present
- Verify markdown syntax is correct

## How It Works

The application fetches markdown files from GitHub using:
- **blogLoader.js** - GitHub API client with functions:
  - `getLatestPosts(limit)` - Latest posts for homepage
  - `fetchBlogPost(slug)` - Individual post content
  - `getRelatedArticles(slug, category, limit)` - Related content suggestions
  - `searchBlogPosts(query)` - Full-text search
  - `getPostsByCategory(category)` - Filter by category

## Blog Features Enabled

Once configured, these features work automatically:
- ✅ Featured blogs on homepage
- ✅ Blog listing page with all articles
- ✅ Individual blog post pages
- ✅ Related articles suggestions
- ✅ Search and filtering
- ✅ Category-based browsing

## File Security

- `.env.local` is in `.gitignore` - Never commit secrets to git
- GitHub tokens are stored locally only
- Use environment-specific tokens for different deployments

## Next Steps

1. Add more blog posts to your GitHub repo
2. Customize categories to match your content
3. Update post metadata as needed
4. Test search and filtering features

For questions, check the browser console for detailed error messages when something doesn't work.
