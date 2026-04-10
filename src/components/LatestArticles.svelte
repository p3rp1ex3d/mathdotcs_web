<script>
	import { onMount } from 'svelte';
	import { getLatestPosts } from '../lib/blogLoader.js';

	let articles = [];
	let loading = true;
	let error = null;

	// Color gradients for cards
	const colors = [
		'from-blue-500/20 to-purple-500/20',
		'from-green-500/20 to-emerald-500/20',
		'from-orange-500/20 to-amber-500/20',
		'from-pink-500/20 to-rose-500/20',
		'from-cyan-500/20 to-blue-500/20',
		'from-violet-500/20 to-purple-500/20'
	];

	onMount(async () => {
		try {
			console.log('📰 Loading latest articles...');
			const posts = await getLatestPosts(4);
			console.log(`📰 Received ${posts.length} posts`);
			articles = posts.map((post, index) => ({
				...post,
				id: index + 1,
				color: colors[index % colors.length]
			}));
			console.log('✅ Latest articles loaded:', articles);
		} catch (err) {
			console.error('❌ Failed to load articles:', err);
			error = 'Unable to load articles. Please try again later.';
			articles = [];
		} finally {
			loading = false;
		}
	});
</script>

<div class="mt-10 mb-12">
	<div class="bg-[#1e1e2e] font-mono mx-4 lg:mx-10 flex items-center justify-between rounded-t-sm py-2.5 px-4 border border-gray-600">
		<div class="flex items-center space-x-1.5">
			<div class="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
			<div class="w-3.5 h-3.5 bg-amber-500 rounded-full"></div>
			<div class="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
			<h1 class="text-gray-300 ml-3 text-xs md:text-sm">~/featured-blogs</h1>
		</div>

		<div class="flex items-center space-x-4 text-gray-400 text-lg">
			<span>―</span>
			<span>☐</span>
			<span>X</span>
		</div>
	</div>

	<div class="bg-[#14141f] font-mono mx-4 lg:mx-10 rounded-b-sm border border-gray-600 pb-8">
		<div class="mt-6 ml-4 mr-4 md:ml-6 md:mr-6">
			<h1 class="text-2xl md:text-3xl text-amber-50">Latest Articles</h1>
		</div>

		{#if loading}
			<div class="mt-8 mx-4 md:mx-6">
				<p class="text-gray-400 text-center py-8">Loading articles...</p>
			</div>
		{:else if error}
			<div class="mt-8 mx-4 md:mx-6">
				<div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
					<p class="text-red-400 text-sm">{error}</p>
				</div>
			</div>
		{:else if articles.length === 0}
			<div class="mt-8 mx-4 md:mx-6">
				<p class="text-gray-400 text-center py-8">No articles found. Check your GitHub configuration.</p>
			</div>
		{:else}
			<div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 mx-4 md:mx-6">
				{#each articles as article (article.id)}
					<a
						href="/blog/{article.slug}"
						class="group bg-linear-to-br {article.color} backdrop-blur-sm border border-gray-600 rounded-lg p-5 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10 cursor-pointer"
					>
						<div class="flex items-center justify-between mb-3">
							<span class="text-xs font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
								{article.category}
							</span>
							<span class="text-xs text-gray-500">{article.readTime}</span>
						</div>
						<h3 class="text-lg font-bold text-amber-50 group-hover:text-blue-300 transition mb-2">
							{article.title}
						</h3>
						<p class="text-sm text-gray-400 mb-4 leading-relaxed">
							{article.excerpt}
						</p>
						<div class="flex items-center justify-between pt-3 border-t border-gray-600/50">
							<span class="text-xs text-gray-500">{article.date}</span>
							<span class="text-blue-400 text-sm group-hover:translate-x-1 transition-transform">→ Read</span>
						</div>
					</a>
				{/each}
			</div>

			<!-- View All Button - Inside Card -->
			<div class="mt-8 mx-4 md:mx-6">
				<a 
					href="/blog" 
					class="w-full block text-center px-6 py-3 bg-linear-to-r from-blue-500/10 to-blue-500/5 text-blue-400 border border-blue-400/30 rounded-lg hover:border-blue-400/60 hover:bg-blue-500/15 transition-all duration-300 font-mono text-sm md:text-base hover:text-blue-300"
				>
					View all Articles ➜
				</a>
			</div>
		{/if}
	</div>
</div>