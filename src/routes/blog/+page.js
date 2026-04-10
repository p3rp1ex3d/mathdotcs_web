import { getLatestPosts } from '$lib/blogLoader.js';

export async function load() {
	const articles = await getLatestPosts(100); // Fetch all posts for listing
	return {
		articles
	};
}
