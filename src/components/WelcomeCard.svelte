<script>
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<div class="mt-5 lg:mx-10 mx-4">
	<div class="bg-[#1e1e2e] font-mono flex items-center justify-between rounded-t-sm py-2.5 px-4 border border-gray-600">
		<div class="flex items-center space-x-1.5">
			<div class="w-3.5 h-3.5 bg-red-500 rounded-full animate-pulse"></div>
			<div class="w-3.5 h-3.5 bg-amber-500 rounded-full animate-pulse" style="animation-delay: 0.1s;"></div>
			<div class="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
			<h1 class="text-gray-300 ml-3 text-xs md:text-sm">~/welcome.md</h1>
		</div>

		<div class="flex items-center space-x-4 text-gray-400 text-lg">
			<span>―</span>
			<span>☐</span>
			<span>X</span>
		</div>
	</div>

	<div class="bg-linear-to-br from-[#14141f] to-[#0a0a0f] font-mono flex flex-col md:flex-row space-x-0 md:space-x-1.5 items-start md:items-center rounded-b-sm border border-gray-600 border-t-0 p-4 md:p-0 relative overflow-hidden">
		<!-- Animated Background Gradient -->
		<div class="absolute inset-0 opacity-30 bg-linear-to-r from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>

		<div class="font-mono w-full md:ml-8 md:mt-8 mt-4 relative z-10">
			<div class="flex items-center space-x-2 mb-2 {mounted ? 'animate-slideDown' : 'opacity-0'}">
				<span class="text-blue-400 animate-pulse">$</span>
				<h1 class="inline-block text-blue-400 bg-[#00a2ff]/10 border border-blue-500 p-1.5 rounded-sm text-xs md:text-sm hover-glow-blue transition-all duration-300">
					init --learning-mode
				</h1>
			</div>

			<h1 class="text-4xl md:text-6xl mt-6 text-amber-50 font-sans font-bold {mounted ? 'animate-fadeIn' : 'opacity-0'}" style="animation-delay: 0.1s;">
				Math.CS
			</h1>

			<h1 class="max-w-3xl wrap-break-word mt-5 text-gray-400 text-base md:text-lg leading-relaxed {mounted ? 'animate-slideUp' : 'opacity-0'} text-left" style="animation-delay: 0.2s;">
				Mathematics. Science. Technology. <span class="text-amber-50">And much more.</span> Simplifying complex concepts through interactive content, visual explanations, and practical examples.
			</h1>

			<div class="flex flex-col md:flex-row mt-8 mb-8 gap-3 md:gap-4 {mounted ? 'animate-slideUp' : 'opacity-0'}" style="animation-delay: 0.3s;">
				<a 
					href="/blog"
					class="bg-blue-400 rounded-sm py-3 px-4 text-gray-900 font-semibold hover:bg-blue-400/90 transition-all duration-200 transform hover:scale-105 active:scale-95 text-center text-sm md:text-base shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40"
				>
					Explore Content ➜
				</a>
				<a 
					href="/puzzles"
					class="bg-[#1e1e2e] hover:bg-[#1e1e2e]/85 rounded-sm py-3 px-4 text-gray-400 border border-gray-600 hover:border-blue-400/50 transition-all duration-200 text-center text-sm md:text-base transform hover:scale-105 active:scale-95"
				>
					Try Puzzles →
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.animate-fadeIn) {
		animation: fadeIn 0.6s ease-out forwards;
	}

	:global(.animate-slideDown) {
		animation: slideDown 0.6s ease-out forwards;
	}

	:global(.animate-slideUp) {
		animation: slideUp 0.6s ease-out forwards;
	}

	:global(.hover-glow-blue:hover) {
		box-shadow: 0 0 20px rgba(0, 162, 255, 0.5);
	}
</style>