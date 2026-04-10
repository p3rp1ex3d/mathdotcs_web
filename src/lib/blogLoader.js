/**
 * GitHub Blog Content Loader
 * Fetches markdown blog posts from a GitHub repository
 * Configure with:
 * - GITHUB_OWNER: Your GitHub username
 * - GITHUB_REPO: Your blog content repository name
 * - VITE_GITHUB_TOKEN: GitHub personal access token (optional, for private repos)
 */

const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'your-username';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'math-cs-blog-content';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

/**
 * Parse frontmatter YAML metadata from markdown
 * @param {string} content - Raw markdown content with frontmatter
 * @returns {Object} - { metadata, content }
 */
function parseFrontmatter(content) {
	const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
	const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
	const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n?/, '');

	const metadata = {};
	if (frontmatter) {
		frontmatter.split('\n').forEach((line) => {
			const colonIndex = line.indexOf(':');
			if (colonIndex > -1) {
				const key = line.substring(0, colonIndex).trim();
				const value = line.substring(colonIndex + 1).trim().replace(/["']/g, '');
				if (key) {
					metadata[key] = value;
				}
			}
		});
	}

	return { metadata, content: markdownContent };
}

/**
 * Fetch headers for GitHub API requests
 */
function getHeaders() {
	const headers = {
		'Accept': 'application/vnd.github.v3+json'
	};
	if (GITHUB_TOKEN) {
		headers['Authorization'] = `token ${GITHUB_TOKEN}`;
	}
	return headers;
}

/**
 * Fetch all blog posts from GitHub repository
 * @returns {Promise<Array>} - Array of blog post objects
 */
export async function fetchBlogPosts() {
	try {
		// Fetch repository info to get default branch
		const repoUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
		const repoResponse = await fetch(repoUrl, {
			headers: getHeaders()
		});

		if (!repoResponse.ok) {
			return [];
		}

		const repoData = await repoResponse.json();
		const defaultBranch = repoData.default_branch || 'main';

		// Fetch repository contents
		const contentsUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/`;

		const contentsResponse = await fetch(contentsUrl, {
			headers: getHeaders()
		});

		if (!contentsResponse.ok) {
			console.error(`❌ Failed to fetch GitHub repo: ${contentsResponse.status} ${contentsResponse.statusText}`);
			const errorData = await contentsResponse.json().catch(() => ({}));
			console.error('   Error details:', errorData);
			return [];
		}

		const files = await contentsResponse.json();
		console.log(`📁 Found ${files.length} items in repo`);
		console.log('   Items:', files.map(f => `${f.name} (${f.type})`).join(', '));

		const markdownFiles = files.filter(
			(file) => file.name.endsWith('.md') && file.type === 'file'
		);
		console.log(`📄 Found ${markdownFiles.length} markdown files`);

		if (markdownFiles.length === 0) {
			console.warn('⚠️  No markdown files found. Make sure to add .md files to your GitHub repo!');
			return [];
		}

		// Fetch and parse each markdown file
		const posts = await Promise.all(
			markdownFiles.map(async (file) => {
				try {
					console.log(`📥 Fetching: ${file.name}`);
					
					// Use GitHub API to fetch file content directly
					const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.name}`;
					console.log(`   API URL: ${apiUrl}`);

					const contentResponse = await fetch(apiUrl, {
						headers: getHeaders()
					});

					if (!contentResponse.ok) {
						console.error(`❌ Failed to fetch ${file.name} via API: ${contentResponse.status}`);
						return null;
					}

					// Log response details
					const responseText = await contentResponse.text();
					console.log(`📦 Raw response (first 200 chars):`, responseText.substring(0, 200));

					let contentText;
					
					// Check if response is markdown (starts with ---) or JSON
					if (responseText.trim().startsWith('---')) {
						// Direct markdown response - use as-is
						console.log(`✅ Received raw markdown content`);
						contentText = responseText;
					} else {
						// Try to parse as JSON (GitHub API response with base64)
						let fileData;
						try {
							fileData = JSON.parse(responseText);
							console.log(`✅ Successfully parsed JSON response`);
						} catch (jsonError) {
							console.error(`❌ Failed to parse response as JSON:`, jsonError);
							console.error(`   Response was:`, responseText.substring(0, 500));
							return null;
						}
						
						// Check if content exists and is base64
						if (!fileData.content) {
							console.error(`❌ No content field in API response for ${file.name}`);
							return null;
						}

						// Decode base64 content
						try {
							contentText = atob(fileData.content);
						} catch (decodeError) {
							console.error(`❌ Failed to decode base64 for ${file.name}:`, decodeError);
							// Fallback: use content as-is if it's already decoded
							contentText = fileData.content;
						}
					}
					
					console.log(`✅ Successfully fetched ${file.name} (${contentText.length} bytes)`);

					const { metadata, content } = parseFrontmatter(contentText);
					console.log(`📋 Parsed metadata:`, {
						title: metadata.title || 'Untitled',
						category: metadata.category || 'General',
						slug: file.name.replace('.md', '')
					});

					return {
						id: Math.random(), // Fallback ID
						slug: file.name.replace('.md', ''),
						title: metadata.title || 'Untitled',
						category: metadata.category || 'General',
						excerpt: metadata.excerpt || 'No description available',
						date: metadata.date || new Date().toLocaleDateString(),
						readTime: metadata.readTime || '5 min read',
						image: metadata.image || '📄',
						author: metadata.author || 'Math.CS',
						content: content.trim(),
						color: metadata.color || 'from-gray-500/20 to-gray-500/20'
					};
				} catch (error) {
					console.error(`❌ Error processing ${file.name}:`, error);
					console.error(`   Error message: ${error.message}`);
					console.error(`   Stack trace:`, error.stack);
					return null;
				}
			})
		);

		// Filter out failed fetches and sort by date (newest first)
		const successfulPosts = posts
			.filter((post) => post !== null)
			.sort((a, b) => {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				return dateB - dateA;
			});

		console.log(`✅ Successfully loaded ${successfulPosts.length} blog posts`);
		successfulPosts.forEach(post => {
			console.log(`   - ${post.title} (${post.category})`);
		});
		return successfulPosts;
	} catch (error) {
		console.error('❌ Error fetching blog posts from GitHub:', error);
		return [];
	}
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - The blog post slug
 * @returns {Promise<Object|null>} - Blog post object or null if not found
 */
export async function fetchBlogPost(slug) {
	try {
		const posts = await fetchBlogPosts();
		return posts.find((post) => post.slug === slug) || null;
	} catch (error) {
		console.error(`Error fetching blog post ${slug}:`, error);
		return null;
	}
}

/**
 * Get related articles (same category, different slug)
 * @param {string} currentSlug - Current blog post slug
 * @param {string} category - Category to match
 * @param {number} limit - Max number of related articles
 * @returns {Promise<Array>} - Array of related blog posts
 */
export async function getRelatedArticles(currentSlug, category, limit = 2) {
	try {
		const posts = await fetchBlogPosts();
		return posts
			.filter((p) => p.category === category && p.slug !== currentSlug)
			.slice(0, limit);
	} catch (error) {
		console.error('Error fetching related articles:', error);
		return [];
	}
}

/**
 * Get latest blog posts
 * @param {number} limit - Number of posts to return
 * @returns {Promise<Array>} - Latest blog posts
 */
export async function getLatestPosts(limit = 4) {
	try {
		const posts = await fetchBlogPosts();
		return posts.slice(0, limit);
	} catch (error) {
		console.error('Error fetching latest posts:', error);
		return [];
	}
}

/**
 * Get posts by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} - Blog posts in category
 */
export async function getPostsByCategory(category) {
	try {
		const posts = await fetchBlogPosts();
		return posts.filter((p) => p.category === category);
	} catch (error) {
		console.error(`Error fetching posts for category ${category}:`, error);
		return [];
	}
}

/**
 * Search blog posts by title or excerpt
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Matching blog posts
 */
export async function searchBlogPosts(query) {
	try {
		const posts = await fetchBlogPosts();
		const lowerQuery = query.toLowerCase();
		return posts.filter(
			(p) =>
				p.title.toLowerCase().includes(lowerQuery) ||
				p.excerpt.toLowerCase().includes(lowerQuery) ||
				p.category.toLowerCase().includes(lowerQuery)
		);
	} catch (error) {
		console.error('Error searching blog posts:', error);
		return [];
	}
}
