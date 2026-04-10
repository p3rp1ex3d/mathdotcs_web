<script>
	export let title = 'Document';
</script>

<div class="flex justify-center bg-[#0a0a0f] py-8">
	<div class="bg-[#1e1e2e] border border-gray-600 rounded-lg overflow-hidden shadow-2xl w-full max-w-5xl mx-4">
		<!-- Terminal Title Bar -->
		<div class="bg-linear-to-r from-[#14141f] to-[#1a1a2e] border-b border-gray-600 px-4 py-3 flex items-center justify-between">
			<div class="flex items-center gap-3">
				<!-- Close Buttons -->
				<div class="flex gap-2">
					<div class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition"></div>
					<div class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition"></div>
					<div class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition"></div>
				</div>
				<!-- Title -->
				<span class="text-gray-400 text-sm font-mono ml-2">{title}</span>
			</div>
			<div class="text-gray-600 text-xs font-mono">math.cs — bash</div>
		</div>

		<!-- Content -->
		<div class="p-8">
			<slot />
		</div>
	</div>
</div>

<style>
	:global(.terminal-document) {
		background: #1e1e2e;
		border: 1px solid #666;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
	}
</style>
