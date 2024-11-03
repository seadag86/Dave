<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ChatForm from '../../chat-form.svelte';
	//import { chatStore } from '$lib/stores/chat.store.svelte';
	import { toast } from 'svelte-sonner';
	import { standardSystemMessages } from '$lib/utils';
	import { SSE } from 'sse.js';
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import type { ChatCompletionChunk } from 'openai/resources/index.mjs';
	import type { Chat, Message } from '$lib/types/chat';

	let { data }: { data: PageData } = $props();
	let messages: Message[] = $state([]);
	let chat: Chat = $derived(data.chat);
	let loading: boolean = $state(false);
	let chatContainer: HTMLElement;

	$effect(() => {
		messages = data.messages;
		scrollToBottom();
	});

	const scrollToBottom = () => {
		if (chatContainer) {
			chatContainer.scrollTo({
				top: chatContainer.scrollHeight,
				behavior: 'smooth'
			});
		}
	};

	const handleFileChange = async (file: File) => {
		// SHow files on page
	};

	const handleSubmit = async (message: string) => {
		console.log('handle submit', message);
		loading = true;

		if (!chat?.id) {
			toast.error('Chat not found');
			return;
		}

		if (messages.length === 0) {
			messages.push({
				id: crypto.randomUUID(),
				role: 'system',
				content: standardSystemMessages[0],
				createdat: new Date().toISOString(),
				chatId: chat.id,
				userId: 'foo',
				isNew: true
			});
		}

		messages.push({
			id: crypto.randomUUID(),
			role: 'user',
			content: message,
			createdat: new Date().toISOString(),
			chatId: chat.id,
			userId: 'foo',
			isNew: true
		});

		const eventSource = new SSE('/api/ai/send', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: messages })
		});

		messages.push({
			id: crypto.randomUUID(),
			role: 'assistant',
			content: '',
			createdat: new Date().toISOString(),
			chatId: chat.id,
			userId: 'foo',
			isNew: true
		});

		eventSource.addEventListener('error', (e: any) => {
			console.log('error', e);
			toast.error('An error occured');
			loading = false;
			return;
		});

		console.log('session messages', messages);

		eventSource.addEventListener('message', async (e: any) => {
			try {
				const data: ChatCompletionChunk = JSON.parse(e.data);

				if (data.choices[0]?.delta) {
					const { content } = data.choices[0].delta;
					const finishReason = data.choices[0].finish_reason as string | null;

					if (content) {
						messages[messages.length - 1].content += content;

						if (chatContainer) {
							scrollToBottom();
						}
					}

					if (finishReason === 'stop') {
						const messageResponse = await fetch('/api/message', {
							method: 'POST',
							body: JSON.stringify({ useStream: true, messages: messages })
						});

						if (!messageResponse.ok) {
							throw new Error('Error saving message');
						}

						messages.forEach((m) => {
							m.isNew = false;
						});
					}
				}
			} catch (err) {
				console.error(err);
				toast.error('An error occurred while processing the message');
			} finally {
				loading = false;
			}
		});

		return;
	};
</script>

<div class="w-full flex flex-col h-full">
	<div
		class="chat-container flex flex-col flex-1 overflow-y-auto smooth-scroll"
		bind:this={chatContainer}
	>
		<div class="flex flex-col gap-3 md:w-[800px] pb-24 px-4 mx-auto">
			{#each messages.filter((m) => m.role !== 'system') as message}
				<div class={`${message.role}-message w-auto`}>
					<SvelteMarkdown source={message.content} />
				</div>
			{/each}
		</div>
	</div>

	<div class="w-full h-[120px] bg-gradient-to-t from-background to-transparent mt-[-120px]"></div>

	<footer class="flex flex-col items-center justify-center bg-background">
		<ChatForm {loading} onFormSubmit={handleSubmit} onFileChange={handleFileChange} />

		<p class="text-sm text-muted-foreground mt-1 mb-2 p-0">
			DAVE can make mistakes. Check important info.
		</p>
	</footer>
</div>
