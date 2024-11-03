import { json } from '@sveltejs/kit';
import { messagesContainer } from '$lib/server/db/client';
import type { RequestHandler } from '@sveltejs/kit';
import type { Message } from '$lib/types/chat';

export const POST: RequestHandler = async ({ request }) => {
	console.log('>>>>>>>>> Message POST request received <<<<<<<<<<');

	try {
		const requestBody = await request.json();
		const messages = requestBody.messages.filter((m: Message) => m.isNew);

		console.log('messages', requestBody);

		// Get the last two messages
		const newMessages = messages.filter((m: Message) => m.isNew === true);

		// Save the last two messages to Cosmos DB
		const savedMessages = await Promise.all(
			newMessages.map(async (message: Message) => {
				const { resource: savedMessage } = await messagesContainer.items.create(message);
				return savedMessage;
			})
		);

		return json({ success: true, messages: savedMessages }, { status: 201 });
	} catch (err) {
		console.error('Error saving messages:', err);
		return json({ success: false, error: 'Failed to save messages' }, { status: 500 });
	}
};
