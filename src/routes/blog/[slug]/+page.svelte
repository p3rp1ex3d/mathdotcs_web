<script>
	import Navbar from '../../../components/Navbar.svelte';
	import Footer from '../../../components/Footer.svelte';
	import TerminalDocument from '../../../components/TerminalDocument.svelte';
	import { onMount } from 'svelte';

	export let data;

	const { post, relatedArticles } = data;

	let renderedHtml = '';
	let contentDiv;

	function escapeHtml(text) {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	function parseMarkdown(markdown) {
		let html = markdown;

		// Extract math expressions first (preserve them)
		const mathExpressions = [];
		html = html.replace(/\$\$[\s\S]*?\$\$|\$[^\$\n]*?\$/g, (match) => {
			mathExpressions.push(match);
			return `\u0001MATH${mathExpressions.length - 1}\u0001`;
		});

		// Extract code blocks (preserve them)
		const codeBlocks = [];
		html = html.replace(/```(.*?)\n([\s\S]*?)```/gm, (match, lang, code) => {
			codeBlocks.push({ lang, code });
			return `\u0001CODE${codeBlocks.length - 1}\u0001`;
		});

		// Escape HTML
		html = html.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		// Headers (must be before bold/italic to avoid conflicts)
		html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
		html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
		html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

		// Bold (must be before italic)
		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

		// Italic (more careful - skip already processed)
		html = html.replace(/(?<!\*)\*([^\*]+)\*(?!\*)/g, '<em>$1</em>');
		html = html.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>');

		// Inline code
		html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

		// Links
		html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

		// Lists (before paragraph wrapping)
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

		// Paragraphs
		html = html.split('\n\n').map(para => {
			if (!para.includes('<') || para.startsWith('<')) return para; // Already HTML
			return '<p>' + para.replace(/\n/g, '<br>') + '</p>';
		}).join('\n');

		// Restore code blocks
		codeBlocks.forEach((block, idx) => {
			const escaped = block.code
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
			html = html.replace(`\u0001CODE${idx}\u0001`, `<pre><code class="language-${block.lang}">${escaped}</code></pre>`);
		});

		// Restore math expressions
		mathExpressions.forEach((expr, idx) => {
			html = html.replace(`\u0001MATH${idx}\u0001`, expr);
		});

		return html;
	}

	onMount(() => {
		renderedHtml = parseMarkdown(post.content);

		// Load KaTeX and render math
		if (!window.katex) {
			// Load KaTeX CSS
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css';
			document.head.appendChild(link);

			// Load KaTeX JS
			const script = document.createElement('script');
			script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js';
			script.onload = () => {
				// Render math after a tick to ensure DOM is updated
				setTimeout(() => {
					if (window.katex && contentDiv) {
						renderMath();
					}
				}, 0);
			};
			document.head.appendChild(script);
		} else {
			// KaTeX already loaded
			setTimeout(() => {
				if (contentDiv) {
					renderMath();
				}
			}, 0);
		}
	});

	function renderMath() {
		if (!contentDiv || !window.katex) return;

		const mathElements = contentDiv.querySelectorAll('script[type="math/tex"]');
		mathElements.forEach((el) => {
			try {
				const mathText = el.textContent;
				const rendered = window.katex.renderToString(mathText, {
					throwOnError: false,
					displayMode: el.className.includes('display')
				});
				el.outerHTML = `<span class="katex-render">${rendered}</span>`;
			} catch (err) {
				console.error('KaTeX render error:', err);
			}
		});

		// Also handle inline and display math in HTML
		if (contentDiv.textContent.includes('$')) {
			// Process inline math $...$
			processInlineMath(contentDiv);
			// Process display math $$...$$
			processDisplayMath(contentDiv);
		}
	}

	function processInlineMath(element) {
		const walker = document.createTreeWalker(
			element,
			NodeFilter.SHOW_TEXT,
			null,
			false
		);

		const nodesToProcess = [];
		let node;
		while ((node = walker.nextNode())) {
			if (node.textContent.includes('$') && !node.textContent.includes('$$')) {
				nodesToProcess.push(node);
			}
		}

		nodesToProcess.forEach((textNode) => {
			const text = textNode.textContent;
			const parts = text.split(/(\$[^\$]+\$)/);
			if (parts.length > 1) {
				const fragment = document.createDocumentFragment();
				parts.forEach((part) => {
					if (part.startsWith('$') && part.endsWith('$')) {
						const mathText = part.slice(1, -1);
						try {
							const rendered = window.katex.renderToString(mathText, { throwOnError: false });
							const span = document.createElement('span');
							span.className = 'katex-inline';
							span.innerHTML = rendered;
							fragment.appendChild(span);
						} catch (err) {
							fragment.appendChild(document.createTextNode(part));
						}
					} else {
						fragment.appendChild(document.createTextNode(part));
					}
				});
				textNode.parentNode.replaceChild(fragment, textNode);
			}
		});
	}

	function processDisplayMath(element) {
		const walker = document.createTreeWalker(
			element,
			NodeFilter.SHOW_TEXT,
			null,
			false
		);

		const nodesToProcess = [];
		let node;
		while ((node = walker.nextNode())) {
			if (node.textContent.includes('$$')) {
				nodesToProcess.push(node);
			}
		}

		nodesToProcess.forEach((textNode) => {
			const text = textNode.textContent;
			const parts = text.split(/(\$\$[\s\S]*?\$\$)/);
			if (parts.length > 1) {
				const fragment = document.createDocumentFragment();
				parts.forEach((part) => {
					if (part.startsWith('$$') && part.endsWith('$$')) {
						const mathText = part.slice(2, -2);
						try {
							const rendered = window.katex.renderToString(mathText, {
								throwOnError: false,
								displayMode: true
							});
							const div = document.createElement('div');
							div.className = 'katex-display';
							div.innerHTML = rendered;
							fragment.appendChild(div);
						} catch (err) {
							fragment.appendChild(document.createTextNode(part));
						}
					} else {
						fragment.appendChild(document.createTextNode(part));
					}
				});
				textNode.parentNode.replaceChild(fragment, textNode);
			}
		});
	}
</script>

<Navbar />

<div class="bg-[#0a0a0f] text-white pt-20 pb-12">
	<TerminalDocument title={post.title}>
		<article>
		<!-- Article Header -->
		<header class="mb-12 space-y-6 border-b border-gray-600 pb-8">
			<div class="space-y-3">
				<div class="flex items-center gap-3 flex-wrap">
					<span class="text-2xl">{post.image}</span>
					<span class="bg-blue-400/10 text-blue-400 px-3 py-1 rounded text-sm font-mono border border-blue-400/30">
						{post.category}
					</span>
					<span class="text-gray-500 text-sm">{post.readTime}</span>
				</div>

				<h1 class="text-5xl md:text-6xl font-bold text-amber-50">{post.title}</h1>

				<p class="text-lg text-gray-400 max-w-2xl">{post.excerpt}</p>
			</div>

			<!-- Article Meta -->
			<div class="flex items-center gap-4 pt-4 text-sm text-gray-500">
				<div>{post.date}</div>
			</div>
		</header>

		<!-- Article Content -->
		<div class="prose prose-invert max-w-none mb-16 markdown-content" bind:this={contentDiv}>
			{@html renderedHtml}
		</div>

		<!-- Related Articles -->
		{#if relatedArticles && relatedArticles.length > 0}
			<section class="space-y-6 border-t border-gray-600 pt-12">
				<h2 class="text-3xl font-bold text-amber-50">Related Articles</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each relatedArticles as related}
						<a
							href="/blog/{related.slug}"
							class="group bg-[#1e1e2e] border border-gray-600 rounded-lg p-6 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/10 transition-all duration-300"
						>
							<h3 class="text-lg font-bold text-amber-50 group-hover:text-blue-300 transition mb-2">
								{related.title}
							</h3>
							<p class="text-sm text-gray-400 group-hover:text-gray-300 transition">
								Continue reading →
							</p>
						</a>
					{/each}
				</div>
			</section>
		{/if}
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
		display: flex;
		justify-content: center;
		margin: 1.5rem 0;
	}

	:global(.katex) {
		color: #e5e5ea;
		font-size: 1.1em;
	}

	:global(.katex .base) {
		position: relative;
	}
</style>
