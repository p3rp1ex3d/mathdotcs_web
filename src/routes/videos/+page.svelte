<script>
	import Navbar from '../../components/Navbar.svelte';
	import Footer from '../../components/Footer.svelte';

	let selectedDifficulty = 'All';
	let searchQuery = '';

	const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

	const videos = [
		{
			id: 1,
			title: 'A Circle\'s Area Revisualized',
			channel: 'MathDotCS',
			difficulty: 'Intermediate',
			duration: '03:41',
			date: 'Jan 2, 2026',
			thumbnail: '🎯',
			youtubeId: 'myVWQCasgmQ',
			description: 'A circle is a simple shape, but its area can be surprisingly tricky to understand. In this video, we explore the area of a circle through a visual and a calculus based approach. This method not only makes the concept of area more tangible but also highlights the beauty of mathematical reasoning.'
		},
		{
			id: 2,
			title: 'Appa, what is Time? - Time before Time',
			channel: 'MathDotCS',
			difficulty: 'Beginner',
			duration: '01:32',
			date: 'Apr 8, 2026',
			thumbnail: '⚡',
			youtubeId: 'X9ibJdOShLI',
			description: 'Have you ever wondered… what time actually is? Is it something humans invented… or something that was always there? In this warm father–child conversation, we begin a journey to understand time — not through clocks, but through patterns in the world around us. Days, birthdays, seasons… everything repeats. But why?'
		}
	];

	$: filteredVideos = videos.filter(video => {
		const matchesDifficulty = selectedDifficulty === 'All' || video.difficulty === selectedDifficulty;
		const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			video.channel.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesDifficulty && matchesSearch;
	});

	function formatViews(views) {
		return views;
	}
</script>

<Navbar />
<div class="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-12">
	<div class="mx-auto max-w-7xl px-4">
		<!-- Header -->
		<div class="mb-12">
			<h1 class="text-5xl font-bold text-amber-50 mb-4">Video Library</h1>
			<p class="text-gray-400 text-lg max-w-2xl">Watch expertly crafted video tutorials covering mathematics, algorithms, and computer science concepts with visual explanations.</p>
		</div>

		<!-- Search Bar -->
		<div class="mb-8">
			<input
				type="text"
				placeholder="🔍 Search videos..."
				bind:value={searchQuery}
				class="w-full bg-[#1e1e2e] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
			/>
		</div>

		<!-- Difficulty Filter -->
		<div class="mb-8 flex flex-wrap gap-2">
			{#each difficulties as difficulty}
				<button
					on:click={() => (selectedDifficulty = difficulty)}
					class="px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 {selectedDifficulty === difficulty
						? 'bg-blue-400 text-gray-900 border border-blue-400'
						: 'bg-[#1e1e2e] text-gray-400 border border-gray-600 hover:border-blue-400/50'}"
				>
					{difficulty}
				</button>
			{/each}
		</div>

		<!-- Videos Grid with Embeds -->
		{#if filteredVideos.length > 0}
			<div class="space-y-12">
				{#each filteredVideos as video (video.id)}
					<div class="group bg-[#1e1e2e] border border-gray-600 rounded-lg overflow-hidden hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
						<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
							<!-- YouTube Embed -->
							<div class="lg:col-span-2">
								<div class="relative w-full bg-black rounded-lg overflow-hidden" style="padding-bottom: 56.25%;">
									<iframe
										width="100%"
										height="100%"
										src="https://www.youtube.com/embed/{video.youtubeId}"
										title={video.title}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
										class="absolute top-0 left-0"
									></iframe>
								</div>
							</div>

							<!-- Video Info -->
							<div class="flex flex-col justify-between space-y-4">
								<div>
									<div class="flex items-center justify-between mb-3">
										<span class="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/30">
											{video.difficulty}
										</span>
										<span class="text-xs text-gray-500">{video.duration}</span>
									</div>

									<h3 class="text-xl font-bold text-amber-50 mb-2 group-hover:text-blue-300 transition">
										{video.title}
									</h3>

									<p class="text-sm text-gray-400 mb-4">
										by <span class="text-blue-400">{video.channel}</span>
									</p>

									<p class="text-sm text-gray-400 leading-relaxed mb-4">
										{video.description}
									</p>
								</div>

								<!-- Video Stats -->
								<div class="border-t border-gray-600 pt-4 space-y-2">
									<div class="flex justify-between text-sm text-gray-500">
										<span>📅 Published</span>
										<span class="text-amber-50">{video.date}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center py-12">
				<p class="text-gray-400 text-lg">No videos found. Try adjusting your search.</p>
			</div>
		{/if}
	</div>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #0a0a0f;
	}
</style>
