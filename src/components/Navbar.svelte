<script>
	import { page } from '$app/stores';
	let mobileMenuOpen = false;
</script>

<div class="sticky top-0 z-50">
	<div class="flex justify-between items-center py-3 px-4 bg-[#14141f]/80 backdrop-blur-sm font-mono">
		<a href="/" class="ml-4 border-blue-400 border-2 px-4 py-1 rounded-md bg-blue-400 text-white font-bold hover:bg-blue-500 transition-all duration-200 text-base md:text-lg tracking-wide">Math.CS</a>
		
		<div class="hidden md:flex items-center space-x-1 mr-4">
			<a
				href="/"
				class="flex items-center gap-3 p-2 rounded-sm transition-all duration-200 {$page.url.pathname === '/' ? 'bg-blue-400 text-white border border-blue-400' : 'text-gray-400 hover:bg-[#69696920] hover:text-white'}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z" />
				</svg>
				Home
			</a>

			<a
				href="/blog"
				class="flex items-center gap-3 p-2 rounded-sm transition-all duration-200 {$page.url.pathname.startsWith('/blog') ? 'bg-blue-400 text-white border border-blue-400' : 'text-gray-400 hover:bg-[#69696920] hover:text-white'}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487l3.651 3.65a1.5 1.5 0 010 2.122L8.25 21H3v-5.25L15.262 3.487a1.5 1.5 0 012.12 0z" />
				</svg>
				Blog
			</a>

			<a
				href="/videos"
				class="flex items-center gap-3 p-2 rounded-sm transition-all duration-200 {$page.url.pathname === '/videos' ? 'bg-blue-400 text-white border border-blue-400' : 'text-gray-400 hover:bg-[#69696920] hover:text-white'}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6.75A2.25 2.25 0 0013.5 4.5h-9A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5h9a2.25 2.25 0 002.25-2.25V13.5l4.5 3v-9l-4.5 3z" />
				</svg>
				Videos
			</a>

			<a
				href="/puzzles"
				class="flex items-center gap-3 p-2 rounded-sm transition-all duration-200 {$page.url.pathname === '/puzzles' ? 'bg-blue-400 text-white border border-blue-400' : 'text-gray-400 hover:bg-[#69696920] hover:text-white'}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25l7.5 4.5v9l-7.5 4.5-7.5-4.5v-9L12 2.25z M12 20v-9 M19.5 6.75l-7.5 4.5 M4.5 6.75l7.5 4.5" />
				</svg>
				Puzzles
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<div class="md:hidden">
			<button 
				on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="p-2 rounded-sm hover:bg-[#69696920] text-gray-400 hover:text-white transition"
				aria-label="Toggle mobile menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="{mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}" />
				</svg>
			</button>
		</div>
	</div>
	<hr class="border-gray-600" />

	<!-- Mobile Dropdown Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden bg-[#14141f]/95 backdrop-blur-sm border-b border-gray-600 font-mono">
			<nav class="flex flex-col">
				<a
					href="/"
					on:click={() => (mobileMenuOpen = false)}
					class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#69696920] transition {$page.url.pathname === '/' ? 'bg-blue-400/10 text-white border-l-2 border-blue-400' : ''}"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z" />
					</svg>
					Home
				</a>
				<a
					href="/blog"
					on:click={() => (mobileMenuOpen = false)}
					class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#69696920] transition {$page.url.pathname.startsWith('/blog') ? 'bg-blue-400/10 text-white border-l-2 border-blue-400' : ''}"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487l3.651 3.65a1.5 1.5 0 010 2.122L8.25 21H3v-5.25L15.262 3.487a1.5 1.5 0 012.12 0z" />
					</svg>
					Blog
				</a>
				<a
					href="/videos"
					on:click={() => (mobileMenuOpen = false)}
					class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#69696920] transition {$page.url.pathname === '/videos' ? 'bg-blue-400/10 text-white border-l-2 border-blue-400' : ''}"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6.75A2.25 2.25 0 0013.5 4.5h-9A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5h9a2.25 2.25 0 002.25-2.25V13.5l4.5 3v-9l-4.5 3z" />
					</svg>
					Videos
				</a>
				<a
					href="/puzzles"
					on:click={() => (mobileMenuOpen = false)}
					class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#69696920] transition {$page.url.pathname === '/puzzles' ? 'bg-blue-400/10 text-white border-l-2 border-blue-400' : ''}"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25l7.5 4.5v9l-7.5 4.5-7.5-4.5v-9L12 2.25z M12 20v-9 M19.5 6.75l-7.5 4.5 M4.5 6.75l7.5 4.5" />
					</svg>
					Puzzles
				</a>
			</nav>
		</div>
	{/if}
</div>
