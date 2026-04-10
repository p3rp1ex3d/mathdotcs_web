import { fetchBlogPost, getRelatedArticles } from '$lib/blogLoader.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const post = await fetchBlogPost(params.slug);

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	const relatedArticles = await getRelatedArticles(params.slug, post.category, 2);

	return {
		post,
		relatedArticles
	};
}
