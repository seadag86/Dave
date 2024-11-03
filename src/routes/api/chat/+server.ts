import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { createChat } from '$lib/server/db/commands/chat.commands';
import type { Chat } from '$lib/types/chat';
import { getChatName } from '$lib/server/openai/helpers';

export const POST: RequestHandler = async ({ request }) => {
	console.log('>>>>>>>>> Chat POST request received <<<<<<<<<<');

	try {
		const requestBody = await request.json();
		const initialMessage: string = requestBody.initialMessage;

		// Validate initialMessage
		if (initialMessage?.length === 0) {
			console.error('Validation error: initialMessage is required');
			return error(400, { code: 400, message: 'Bad Request' });
		}

		// Get the title for a new chat
		const completionResponse = await getChatName(initialMessage);

		// Get summarized chat title
		const title = completionResponse.choices[0].message.content;
		if (title?.length === 0) {
			console.error('Error getting chat name:');
			return error(500, { code: 500, message: 'Failed to get chat name' });
		}

		const newChat: Chat = {
			id: crypto.randomUUID(),
			createdat: new Date().toISOString(),
			title: title ?? `New Chat from ${new Date().toLocaleDateString()}`,
			userId: 'foo'
		};

		// Save the chat to Cosmos DB
		const savedChat = await createChat(newChat);

		return json({ success: true, chat: savedChat }, { status: 201 });
	} catch (error) {
		console.error('Error saving chat:', error);
		return json({ success: false, error: 'Failed to save chat' }, { status: 500 });
	}
};
