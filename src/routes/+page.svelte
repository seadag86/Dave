<script lang="ts">
	import { toast } from 'svelte-sonner';
	import ChatForm from './chat-form.svelte';
	import { goto } from '$app/navigation';
	import { chatStore } from '$lib/stores/chat.store.svelte';

	let loading = $state(false);

	// $effect.pre(() => {
	// 	chatStore.setPassedMessage('');
	// 	chatStore.setSessionMessages([]);
	// });

	const handleSubmit = async (message: string) => {
		loading = true;

		const chatResponse = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ initialMessage: message })
		});

		if (!chatResponse.ok) {
			console.error(chatResponse.statusText);
			toast.error('An error occurred while saving chat');
			return;
		}

		const { chat: newChat } = await chatResponse.json();

		chatStore.addUserChat(newChat);
		chatStore.setPassedMessage(message);

		goto(`/chat/${newChat.id}`);

		loading = false;
		return;
	};

	const handleFileChange = async (file: File) => {
		// Show files on page
	};
</script>

<div class="w-full flex flex-col items-center justify-center flex-1">
	<h1 class="text-3xl text-center font-semibold mb-2">Hi, I'm Dave. How can I help?</h1>

	<footer class="flex flex-col items-center justify-center bg-background">
		<ChatForm {loading} onFormSubmit={handleSubmit} onFileChange={handleFileChange} />

		<p class="text-sm text-muted-foreground mt-1 mb-2 p-0">
			DAVE can make mistakes. Check important info.
		</p>
	</footer>
</div>
