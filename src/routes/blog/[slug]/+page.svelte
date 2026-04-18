<script>
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	import TerminalDocument from '../../../components/TerminalDocument.svelte';
	import { onMount, tick } from 'svelte';

	export let data;
	const { post } = data;

	let renderedHtml = '';
	let contentDiv;

	function parseMarkdown(markdown) {
		let html = markdown;

		html = html
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
		html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
		html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/(?<!\*)\*([^\*]+)\*(?!\*)/g, '<em>$1</em>');

		html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

		const lines = html.split('\n');
		let inList = false;
		html = lines.map(line => {
			if (line.trim().startsWith('- ')) {
				if (!inList) {
					inList = true;
					return '<ul><li>' + line.replace(/^- /, '') + '</li>';
				}
				return '<li>' + line.replace(/^- /, '') + '</li>';
			} else {
				if (inList) {
					inList = false;
					return '</ul>' + line;
				}
				return line;
			}
		}).join('\n');
		if (inList) html += '</ul>';

		html = html.split('\n\n').map(para => {
			const trimmed = para.trim();
			if (/^\$\$[\s\S]*\$\$$/.test(trimmed)) return trimmed;
			if (!trimmed) return '';
			if (trimmed.startsWith('<')) return trimmed;
			return '<p>' + trimmed.replace(/\n/g, '<br>') + '</p>';
		}).join('\n');

		return html;
	}

	function renderMath() {
		if (!contentDiv || !window.katex) return;

		let html = contentDiv.innerHTML;

		html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
			try {
				return `<div class="katex-display">${
					window.katex.renderToString(math.trim(), {
						displayMode: true,
						throwOnError: false
					})
				}</div>`;
			} catch {
				return _;
			}
		});

		html = html.replace(/(?<!\$)\$([^\$]+)\$(?!\$)/g, (_, math) => {
			try {
				return `<span class="katex-inline">${
					window.katex.renderToString(math.trim(), {
						throwOnError: false
					})
				}</span>`;
			} catch {
				return _;
			}
		});

		contentDiv.innerHTML = html;
	}

	onMount(async () => {
		renderedHtml = parseMarkdown(post.content);

		if (!window.katex) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css';
			document.head.appendChild(link);

			const script = document.createElement('script');
			script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js';
			document.head.appendChild(script);
			await new Promise(resolve => script.onload = resolve);
		}

		await tick();
		renderMath();
	});
</script>

<Navbar />

<div class="bg-[#0a0a0f] text-white pt-20 pb-12">
	<TerminalDocument title={post.title}>
		<article>
			<header class="mb-0 space-y-6 border-b border-gray-600 pb-8">
				<div class="space-y-3">
					<div class="flex items-center gap-3 flex-wrap">
						<span class="bg-blue-400/10 text-blue-400 px-1 py-1 rounded text-sm font-mono border border-blue-400/30">
							{post.category}
						</span>
						<span class="text-gray-500 text-sm">{post.readTime}</span>
					</div>

					<h1 class="text-5xl md:text-6xl font-bold text-amber-50">{post.title}</h1>
					<p class="text-lg text-gray-400 max-w-2xl">{post.excerpt}</p>
				</div>

				<div class="flex items-center gap-4 pt-4 text-sm text-gray-500">
					<div>{post.date}</div>
				</div>
			</header>

			<div class="prose prose-invert max-w-none mb-16 markdown-content" bind:this={contentDiv}>
				{@html renderedHtml}
			</div>
		</article>
	</TerminalDocument>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #0a0a0f;
	}

	:global(.markdown-content) {
		color: #e5e5ea;
	}

	:global(.markdown-content h1) {
		font-size: 2.25rem;
		font-weight: bold;
		color: #fef3c7;
		margin-top: 3rem;
		margin-bottom: 1.5rem;
	}

	:global(.markdown-content h2) {
		font-size: 1.875rem;
		font-weight: bold;
		color: #fef3c7;
		margin-top: 2.5rem;
		margin-bottom: 1.5rem;
	}

	:global(.markdown-content h3) {
		font-size: 1.5rem;
		font-weight: bold;
		color: #93c5fd;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.markdown-content h4) {
		font-size: 1.25rem;
		font-weight: bold;
		color: #93c5fd;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.markdown-content p) {
		color: #d1d5db;
		line-height: 1.75;
		margin-bottom: 1rem;
	}

	:global(.markdown-content strong),
	:global(.markdown-content b) {
		font-weight: bold;
		color: #fef3c7;
	}

	:global(.markdown-content em),
	:global(.markdown-content i) {
		font-style: italic;
		color: #e5e7eb;
	}

	:global(.markdown-content code) {
		background-color: #14141f;
		color: #60a5fa;
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-family: 'Monaco', 'Menlo', monospace;
		border: 1px solid #374151;
	}

	:global(.markdown-content pre) {
		background-color: #14141f;
		border: 1px solid #374151;
		border-radius: 0.5rem;
		padding: 1rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	:global(.markdown-content pre code) {
		background-color: transparent;
		padding: 0;
		border: none;
		color: #60a5fa;
	}

	:global(.markdown-content ul),
	:global(.markdown-content ol) {
		margin-bottom: 1rem;
		margin-left: 1.5rem;
	}

	:global(.markdown-content li) {
		color: #d1d5db;
		margin-bottom: 0.5rem;
	}

	:global(.markdown-content ul li) {
		list-style-type: disc;
	}

	:global(.markdown-content ol li) {
		list-style-type: decimal;
	}

	:global(.markdown-content blockquote) {
		border-left: 4px solid #60a5fa;
		padding-left: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		margin: 1rem 0;
		color: #9ca3af;
		font-style: italic;
	}

	:global(.markdown-content table) {
		width: 100%;
		margin-bottom: 1.5rem;
		border-collapse: collapse;
	}

	:global(.markdown-content th),
	:global(.markdown-content td) {
		border: 1px solid #374151;
		padding: 0.5rem 1rem;
		text-align: left;
		color: #d1d5db;
	}

	:global(.markdown-content th) {
		background-color: #1e1e2e;
		font-weight: bold;
		color: #fef3c7;
	}

	:global(.markdown-content a) {
		color: #60a5fa;
		text-decoration: underline;
		transition: color 0.2s;
	}

	:global(.markdown-content a:hover) {
		color: #93c5fd;
	}

	:global(.markdown-content hr) {
		border: none;
		border-top: 1px solid #4b5563;
		margin: 2rem 0;
	}

	:global(.markdown-content img) {
		max-width: 100%;
		border-radius: 0.5rem;
		margin: 1rem 0;
	}

	:global(.katex-inline) {
		display: inline;
		margin: 0 0.2em;
	}

	:global(.katex-display) {
		display: block !important;
		text-align: center;
		margin: 1.5rem 0;
		clear: both;
		width: 100%;
	}

	:global(.katex) {
		color: #e5e5ea;
		font-size: 1.1em;
	}

	:global(.katex .base) {
		position: relative;
	}
</style>