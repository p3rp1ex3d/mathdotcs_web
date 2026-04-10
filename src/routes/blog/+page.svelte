<script>
	import { onMount } from 'svelte';
	import Navbar from '../../components/Navbar.svelte';
	import Footer from '../../components/Footer.svelte';
	import { getLatestPosts } from '../../lib/blogLoader.js';

	let articles = [];
	let selectedCategory = 'All';
	let searchQuery = '';
	let loading = true;
	let error = null;

	let categories = ['All'];

	onMount(async () => {
		try {
			console.log('📚 Loading all blog articles...');
			const posts = await getLatestPosts(100);
			console.log(`📚 Received ${posts.length} posts from GitHub`);
			
			articles = posts.map((post, index) => ({
				...post,
				id: index + 1,
				image: post.image || '📄'
			}));
			console.log('✅ Articles mapped:', articles);
			
			// Extract unique categories from posts
			const uniqueCategories = new Set(articles.map(a => a.category));
			categories = ['All', ...Array.from(uniqueCategories).sort()];
			console.log('📑 Categories found:', categories);
		} catch (err) {
			console.error('❌ Failed to load articles:', err);
			error = 'Unable to load articles. Please check your GitHub configuration.';
		} finally {
			loading = false;
		}
	});

	$: filteredArticles = articles.filter(article => {
		const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
		const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});
</script>

<Navbar />
<div class="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-12">
	<div class="mx-auto max-w-6xl px-4">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-5xl font-bold text-amber-50 mb-4">Blog Articles</h1>
			<p class="text-gray-400 text-lg max-w-2xl">Explore in-depth articles on mathematics, computer science, and technology. Learn through detailed explanations and practical examples.</p>
		</div>

		{#if loading}
			<div class="text-center py-12">
				<p class="text-gray-400 text-lg">Loading articles...</p>
			</div>
		{:else if error}
			<div class="mb-8 bg-red-500/10 border border-red-500/30 rounded-lg p-6">
				<p class="text-red-400">{error}</p>
			</div>
		{:else}
			<!-- Search Bar -->
			<div class="mb-8">
				<input
					type="text"
					placeholder="🔍 Search articles..."
					bind:value={searchQuery}
					class="w-full bg-[#1e1e2e] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
				/>
			</div>

			<!-- Category Filter -->
			<div class="mb-8 flex flex-wrap gap-2">
				{#each categories as category}
					<button
						on:click={() => (selectedCategory = category)}
						class="px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 {selectedCategory === category
							? 'bg-blue-400 text-gray-900 border border-blue-400'
							: 'bg-[#1e1e2e] text-gray-400 border border-gray-600 hover:border-blue-400/50'}"
					>
						{category}
					</button>
				{/each}
			</div>

			<!-- Articles Grid -->
			{#if filteredArticles.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each filteredArticles as article (article.id)}
						<a
							href="/blog/{article.slug}"
							class="group bg-[#1e1e2e] border border-gray-600 rounded-lg p-6 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10 cursor-pointer transform hover:-translate-y-1"
						>
							<div class="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{article.image}</div>
							<div class="flex items-center justify-between mb-2">
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
							<div class="flex items-center justify-between pt-4 border-t border-gray-600/50">
								<span class="text-xs text-gray-500">{article.date}</span>
								<span class="text-blue-400 text-sm group-hover:translate-x-1 transition-transform">→ Read</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="text-center py-12">
					<p class="text-gray-400 text-lg">No articles found. Try adjusting your search or check your GitHub configuration.</p>
				</div>
			{/if}
		{/if}
	</div>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #0a0a0f;
	}
</style>
