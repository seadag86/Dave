<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { chatStore } from '$lib/stores/chat.store.svelte';
	import { Loader2, Paperclip, Send } from 'lucide-svelte';
	import { onMount } from 'svelte';

	type FormProps = {
		loading: boolean;
		onFormSubmit: (message: string) => void;
		onFileChange: (file: File) => void;
	};

	let { loading, onFormSubmit, onFileChange }: FormProps = $props();

	let message = $state('');
	let fileInput: HTMLInputElement;
	let submitButton: HTMLButtonElement;

	onMount(() => {
		if (chatStore.passedMessage.length > 0) {
			message = chatStore.passedMessage;
			submitButton?.click();
			chatStore.setPassedMessage('');
		}
	});
</script>

<form
	class="flex items-center justify-center md:w-[800px] mx-auto pl-2 pr-3 py-1 mt-4 bg-input rounded-full"
	onsubmit={(e: SubmitEvent) => {
		e.preventDefault();
		onFormSubmit(message);
		message = '';
	}}
>
	<Button variant="ghost" size="icon" class="w-8 h-8" on:click={() => fileInput?.click()}>
		<Paperclip class="h-4 w-4" />
	</Button>

	<input
		type="file"
		accept="image/png, image/jpeg"
		class="hidden"
		onchange={() => {
			if (fileInput && fileInput.files && fileInput.files.length > 0) {
				const file = fileInput.files[0];
				onFileChange(file);
			}
		}}
		bind:this={fileInput}
	/>

	<textarea
		placeholder="Type your message here..."
		rows={1}
		class="flex-1 w-full resize-y min-h-[2.5rem] border-none bg-transparent p-2 focus:ring-transparent focus:outline-none focus-visible:outline-none placeholder:text-foreground/50"
		bind:value={message}
		onkeydown={(e) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				onFormSubmit(message);
				message = '';
			}
		}}
	></textarea>

	<button
		type="submit"
		class="rounded-full w-8 h-8 pr-.5 ml-2"
		disabled={loading}
		bind:this={submitButton}
	>
		{#if loading}
			<Loader2 class="h-4 w-4 animate-spin" />
		{:else}
			<Send class="h-4 w-4" />
		{/if}
	</button>
</form>
