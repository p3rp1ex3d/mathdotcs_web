<script>
	import Navbar from '../../components/Navbar.svelte';
	import Footer from '../../components/Footer.svelte';

	/*
	ORIGINAL PUZZLES PAGE CODE (COMMENTED OUT FOR NOW)
	
	let selectedTopic = 'All';
	let selectedDifficulty = 'All';
	let searchQuery = '';

	const topics = ['All', 'Mathematics', 'Algorithms', 'Logic', 'Combinatorics'];
	const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

	const puzzles = [
		{
			id: 1,
			title: 'Fibonacci Sequence',
			topic: 'Mathematics',
			difficulty: 'Easy',
			participants: 342,
			successRate: '87%',
			icon: '🔢'
		},
		{
			id: 2,
			title: 'Tower of Hanoi',
			topic: 'Logic',
			difficulty: 'Medium',
			participants: 298,
			successRate: '64%',
			icon: '🗼'
		},
		{
			id: 3,
			title: 'Graph Coloring',
			topic: 'Algorithms',
			difficulty: 'Hard',
			participants: 156,
			successRate: '42%',
			icon: '🎨'
		},
		{
			id: 4,
			title: 'Prime Number Generator',
			topic: 'Mathematics',
			difficulty: 'Medium',
			participants: 421,
			successRate: '71%',
			icon: '✨'
		},
		{
			id: 5,
			title: 'Sudoku Solver',
			topic: 'Logic',
			difficulty: 'Hard',
			participants: 387,
			successRate: '55%',
			icon: '🧩'
		},
		{
			id: 6,
			title: 'Permutations & Combinations',
			topic: 'Combinatorics',
			difficulty: 'Medium',
			participants: 289,
			successRate: '68%',
			icon: '🔄'
		},
		{
			id: 7,
			title: 'Shortest Path Problem',
			topic: 'Algorithms',
			difficulty: 'Medium',
			participants: 267,
			successRate: '73%',
			icon: '🗺️'
		},
		{
			id: 8,
			title: 'Knight\'s Tour',
			topic: 'Logic',
			difficulty: 'Hard',
			participants: 124,
			successRate: '38%',
			icon: '♞'
		},
		{
			id: 9,
			title: 'Collatz Conjecture',
			topic: 'Mathematics',
			difficulty: 'Easy',
			participants: 512,
			successRate: '92%',
			icon: '∞'
		}
	];

	$: filteredPuzzles = puzzles.filter(puzzle => {
		const matchesTopic = selectedTopic === 'All' || puzzle.topic === selectedTopic;
		const matchesDifficulty = selectedDifficulty === 'All' || puzzle.difficulty === selectedDifficulty;
		const matchesSearch = puzzle.title.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesTopic && matchesDifficulty && matchesSearch;
	});

	function getDifficultyColor(difficulty) {
		switch (difficulty) {
			case 'Easy':
				return 'bg-green-500/10 text-green-400 border-green-400/30';
			case 'Medium':
				return 'bg-amber-500/10 text-amber-400 border-amber-400/30';
			case 'Hard':
				return 'bg-red-500/10 text-red-400 border-red-400/30';
			default:
				return 'bg-blue-500/10 text-blue-400 border-blue-400/30';
		}
	}
	*/
</script>

<Navbar />

<div class="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-4 pt-20">
	<div class="bg-[#1e1e2e] border border-gray-600 rounded-lg p-8 md:p-12 max-w-2xl w-full">
		<!-- Terminal Header -->
		<div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-600">
			<div class="flex items-center space-x-1.5">
				<div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
				<div class="w-3 h-3 bg-amber-500 rounded-full animate-pulse" style="animation-delay: 0.1s;"></div>
				<div class="w-3 h-3 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
				<span class="text-gray-400 ml-3 text-sm font-mono">~/puzzles.md</span>
			</div>
			<div class="flex items-center space-x-3 text-gray-400 text-sm">
				<span>―</span>
				<span>☐</span>
				<span>X</span>
			</div>
		</div>

		<!-- Content -->
		<div class="space-y-4">
			<div class="text-sm font-mono text-blue-400 mb-6">
				<span class="text-gray-400">$</span> status --puzzles
			</div>

			<h1 class="text-4xl md:text-5xl font-bold text-amber-50 mt-6">Coming Soon</h1>

			<p class="text-gray-400 text-lg leading-relaxed mt-4">
				The Interactive Puzzles section is currently under development and will be available soon. We're carefully crafting engaging challenges to help you master problem-solving skills across mathematics, algorithms, and computer science.
			</p>

			<div class="bg-[#14141f] border border-gray-600 rounded p-4 mt-6 font-mono text-sm text-gray-400 space-y-2">
				<div class="text-green-400">✓ Puzzle engine</div>
				<div class="text-green-400">✓ Difficulty levels (Easy, Medium, Hard)</div>
				<div class="text-green-400">✓ Progress tracking</div>
				<div class="text-yellow-400">⧗ Leaderboard system</div>
				<div class="text-yellow-400">⧗ User solutions & explanations</div>
			</div>

			<div class="mt-8 flex flex-col md:flex-row gap-4">
				<a
					href="/"
					class="px-6 py-3 bg-blue-400 text-gray-900 font-semibold rounded-lg hover:bg-blue-400/90 transition-all duration-200 text-center"
				>
					← Back to Home
				</a>
				<a
					href="/blog"
					class="px-6 py-3 bg-[#14141f] text-gray-400 border border-gray-600 font-semibold rounded-lg hover:border-blue-400/50 transition-all duration-200 text-center"
				>
					Explore Blog →
				</a>
			</div>
		</div>
	</div>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #0a0a0f;
	}
</style>
