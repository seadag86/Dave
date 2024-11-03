<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { PanelLeftClose, PanelLeftOpen, SquarePen } from 'lucide-svelte';
	import { sidebarStore } from '$lib/stores/ui-store.svelte';
	import { chatStore } from '$lib/stores/chat.store.svelte';
	import { page } from '$app/stores';
	import { MoreHorizontal } from 'lucide-svelte';
	onMount(() => {
		chatStore.createUserChats($page.data.chats);
	});
</script>

<aside
	class={`flex flex-col gap-3 px-3 transition-all w-[260px] h-screen duration-300 ease-in-out ${sidebarStore.sidebarOpen ? 'left-0' : 'left-[-260px] bg-transparent'} bg-secondary text-secondary-foreground`}
>
	<header class="flex items-center justify-between h-16">
		<Button
			variant="ghost"
			size="icon"
			class={`${!sidebarStore.sidebarOpen ? 'absolute left-[270px]' : ''}`}
			on:click={() => sidebarStore.toggleOpen()}
		>
			{#if sidebarStore.sidebarOpen}
				<PanelLeftClose />
			{:else}
				<PanelLeftOpen />
			{/if}
		</Button>

		{#if $page.data.theme === 'dark'}
			<img src="/logo.svg" alt="dave-logo" class="mt-2 w-12 h-12" />
		{:else}
			<img src="/logo-light.svg" alt="dave-logo-dark" class="mt-2 w-12 h-12" />
		{/if}

		<Button variant="ghost" size="icon" href="/">
			<SquarePen />
		</Button>
	</header>

	<nav>
		<ul class="m-0 p-0">
			<li>
				<a
					href="/"
					class="flex items-center py-1 px-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-foreground/5"
				>
					<span class="truncate">Help</span>
				</a>
			</li>
			<li>
				<a
					href="/"
					class="flex items-center py-1 px-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-foreground/5"
				>
					<span class="truncate">Survey</span>
				</a>
			</li>
		</ul>
	</nav>

	<nav>
		<h2 class="text-sm font-semibold text-foreground/50 pt-4 pb-1 px-2">Chat History</h2>
		<ul class="m-0 p-0">
			{#each chatStore.userChats as chat}
				<li class="relative my-1">
					<a
						href={`/chat/${chat.id}`}
						class="flex items-center py-1 px-2 transition-all duration-300 ease-in-out hover:bg-zinc-800"
					>
						<span class="text-sm overflow-hidden whitespace-nowrap">{chat.title}</span>
					</a>
					<div
						class="absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent to-secondary"
					></div>
					<button class="hidden absolute right-0 top-1/2 -translate-y-1/2 px-2 h-6 w-8 bg-zinc-800">
						<MoreHorizontal class="h-4 w-4" />
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	li:hover div,
	li:focus div {
		display: none;
	}

	li:hover button,
	li:focus button {
		display: block;
	}
</style>
