<script>
	import './layout.css';
	import favicon from '$lib/assets/image.png';
	import { theme } from '$lib/stores/themeStore.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const savedTheme = 'terminal';

		theme.setTheme(savedTheme);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Math.CS - Learn mathematics, computer science, and technology through interactive content and practical examples." />
	<title>Math.CS - Learn Mathematics & Computer Science</title>
</svelte:head>

<div class="app">
	{@render children()}
</div>

<style global>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
	}

	:global([data-theme='terminal'] body) {
		background-color: #0a0a0f;
		color: #e5e5ea;
	}


	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button) {
		cursor: pointer;
		border: none;
	}
</style>