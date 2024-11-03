import { getMessagesByChatId } from '$lib/server/db/queries/message.queries';
import { getChatById } from '$lib/server/db/queries/chat.queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Chat, Message } from '$lib/types/chat';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends('chat:messages');

	let messages: Message[] = [];
	let chat: Chat;

	try {
		chat = await getChatById(params.id);
		messages = await getMessagesByChatId(params.id);
		messages = messages.map((m: Message) => {
			return {
				...m,
				isNew: false
			};
		});
	} catch (err) {
		console.error('Error fetching messages:', err);
		throw error(500, { code: 500, message: 'An error occurred while processing your request.' });
	}

	if (!chat) {
		throw error(404, { code: 404, message: 'Chat not found' });
	}

	return {
		chat,
		messages
	};
};
