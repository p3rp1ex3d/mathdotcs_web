<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import LoadingScreen from '../components/LoadingScreen.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Math.CS - Learn mathematics, computer science, and technology through interactive content and practical examples." />
	<title>Math.CS - Learn Mathematics & Computer Science</title>
</svelte:head>

<LoadingScreen>
	<div class="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
		{@render children()}
	</div>
</LoadingScreen>

<style global>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		background-color: #0a0a0f;
		color: #e5e5ea;
		font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
		margin: 0;
		padding: 0;
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
