<script lang="ts">
	import '../app.css';
	import AppSidebar from '$lib/components/layout/app-sidebar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import AppHeader from '$lib/components/layout/app-header.svelte';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="flex h-screen">
	<AppSidebar />

	<main class="flex flex-col items-stretch justify-start flex-1 overflow-hidden">
		<AppHeader />

		<div class="flex flex-col flex-1 overflow-y-auto">
			{@render children()}
		</div>
	</main>
</div>

<Toaster />
