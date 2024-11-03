import { messagesContainer } from '$lib/server/db/client';
import type { Message } from '$lib/types/chat';

export async function getMessagesByChatId(chatId: string) {
	const querySpec = {
		query: 'SELECT * FROM m WHERE m.chatId = @chatId ORDER BY m.createdAt ASC',
		parameters: [
			{
				name: '@chatId',
				value: chatId
			}
		]
	};

	const { resources: messages } = await messagesContainer.items
		.query<Message>(querySpec)
		.fetchAll();
	return messages;
}
