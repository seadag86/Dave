import { messagesContainer } from '$lib/server/db/client';
import type { Message } from '$lib/types/chat';

export async function createMessageInChat(chatId: string, message: Omit<Message, 'id'>) {
	const newMessage: Message = {
		id: crypto.randomUUID(),
		...message
	};

	const { resource: createdMessage } = await messagesContainer.items.create(newMessage);
	return createdMessage;
}
