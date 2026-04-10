<script>
	import { onMount } from 'svelte';

	let loading = true;
	let progress = 0;

	const loadingSteps = [
		'$ boot --math-cs',
		'✓ Initializing learning engine',
		'✓ Loading knowledge base (Mathematics)',
		'✓ Loading knowledge base (Computer Science)',
		'✓ Compiling visual explanations',
		'✓ Preparing interactive content',
		'✓ Setting up problem solver',
		'✓ Indexing tutorials & guides',
		'✓ Activating community features',
		'$ run --start-learning'
	];

	let currentStep = 0;

	onMount(() => {
		// Simulate loading progress with step progression
		const interval = setInterval(() => {
			if (currentStep < loadingSteps.length) {
				progress += (100 / loadingSteps.length) * (0.8 + Math.random() * 0.4);
				if (progress > (currentStep + 1) * (100 / loadingSteps.length)) {
					currentStep++;
				}
			}

			if (progress >= 100) {
				progress = 100;
				setTimeout(() => {
					loading = false;
				}, 800);
				clearInterval(interval);
			}
		}, 200);

		return () => clearInterval(interval);
	});
</script>

{#if loading}
	<div class="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden">
		<!-- Animated Background -->
		<div class="absolute inset-0 z-0 pointer-events-none">
			<div class="absolute inset-0 bg-linear-to-br from-blue-500/3 via-transparent to-purple-500/3"></div>
		</div>

		<!-- Content -->
		<div class="relative z-10 text-center space-y-6 px-4 max-w-2xl">
			<!-- Animated Logo/Title -->
			<div class="space-y-3">
				<h1 class="text-6xl md:text-7xl font-bold text-amber-50 font-sans tracking-wider animate-fadeIn">
					MATH.CS
				</h1>
				<p class="text-gray-400 text-lg font-light">Mastering Mathematics & Computer Science</p>
				<div class="h-1 w-40 bg-linear-to-r from-blue-400/60 via-purple-500/60 to-blue-400/60 rounded-full mx-auto animate-pulse"></div>
			</div>

			<!-- Terminal Window Simulation -->
			<div class="bg-[#1e1e2e] border border-gray-600 rounded-lg overflow-hidden font-mono text-xs md:text-sm shadow-2xl">
				<!-- Terminal Header -->
				<div class="flex items-center justify-between px-4 py-3 border-b border-gray-600 bg-[#14141f]">
					<div class="flex items-center space-x-1.5">
						<div class="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
						<div class="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
						<div class="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
					</div>
					<span class="text-gray-500">~/learning-system.sh</span>
					<div class="w-8"></div>
				</div>

				<!-- Terminal Content -->
				<div class="p-4 space-y-1 h-48 overflow-y-auto bg-[#1e1e2e]">
					{#each loadingSteps.slice(0, Math.ceil((currentStep / loadingSteps.length) * loadingSteps.length)) as step, i}
						{#if i === 0}
							<div class="text-blue-400/70">{step}</div>
						{:else if i < currentStep}
							<div class="text-green-400/70">{step}</div>
						{:else if i === currentStep}
							<div class="text-blue-400/70 flex items-center space-x-2">
								<span>{step}</span>
								<span class="inline-block w-2 h-4 bg-blue-400/70 animate-pulse"></span>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Education Features Loading -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
				<div class={`p-3 rounded border transition-all duration-300 ${currentStep >= 3 ? 'border-green-400/30 bg-green-500/3 text-green-400/70' : 'border-gray-600 text-gray-500'}`}>
					<div class="font-semibold">📚 Content</div>
					<div class="text-xs">Articles & Guides</div>
				</div>
				<div class={`p-3 rounded border transition-all duration-300 ${currentStep >= 6 ? 'border-blue-400/30 bg-blue-500/3 text-blue-400/70' : 'border-gray-600 text-gray-500'}`}>
					<div class="font-semibold">🎬 Videos</div>
					<div class="text-xs">Tutorials & Demos</div>
				</div>
				<div class={`p-3 rounded border transition-all duration-300 ${currentStep >= 9 ? 'border-purple-400/30 bg-purple-500/3 text-purple-400/70' : 'border-gray-600 text-gray-500'}`}>
					<div class="font-semibold">🧠 Learning</div>
					<div class="text-xs">Interactive Path</div>
				</div>
			</div>

			<!-- Progress Bar -->
			<div class="w-full space-y-2">
				<div class="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
					<div
							class="h-full bg-linear-to-r from-blue-400/60 via-purple-400/60 to-blue-400/60 transition-all duration-300 ease-out"
						style="width: {progress}%"
					></div>
				</div>
				<p class="text-xs text-gray-500 font-mono">{Math.round(progress)}% Initializing learning environment...</p>
			</div>

			<!-- Tagline -->
			<p class="text-gray-500 text-sm italic font-light">
				Dive deep into mathematics, algorithms, and computer science.
			</p>
		</div>

		<!-- Floating Particles -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
			{#each Array(5) as _, i}
				<div
					class="absolute w-1 h-1 bg-blue-400 rounded-full"
					style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation: float 8s infinite ease-in-out; animation-delay: {i * 0.3}s;"
				></div>
			{/each}
		</div>
	</div>
{:else}
	<slot />
{/if}

<style global>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) translateX(0px);
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}

	:global(.animate-fadeIn) {
		animation: fadeIn 0.8s ease-out;
	}
</style>
