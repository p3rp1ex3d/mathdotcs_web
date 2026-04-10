<script>
	import CardComponets from "../components/CardComponets.svelte";
	import Footer from "../components/Footer.svelte";
	import LatestArticles from "../components/LatestArticles.svelte";
	import Navbar from "../components/Navbar.svelte";
	import WelcomeCard from "../components/WelcomeCard.svelte";
</script>

<div class="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
	<!-- Animated Background Elements -->
	<div class="fixed inset-0 z-0 pointer-events-none">
		<!-- Gradient Orbs -->
		<div class="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
		<div class="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style="animation-delay: 2s;"></div>
		<div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style="animation-delay: 4s;"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10">
		<Navbar />
		<WelcomeCard />
		<CardComponets />
		<LatestArticles />
		<Footer />
	</div>
</div>

<style global>
	@keyframes blob {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	:global(.animate-blob) {
		animation: blob 7s infinite;
	}

	/* Ensure proper stacking context */
	:global(body) {
		background-color: #0a0a0f;
	}

	/* Smooth transitions for all interactive elements */
	:global(button),
	:global(a) {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 200ms;
	}

	:global(input),
	:global(textarea) {
		transition: border-color 200ms, box-shadow 200ms;
	}
</style>