import { chatsContainer } from '$lib/server/db/client';
import type { Chat } from '$lib/types/chat';

export async function getUserChats(userId: string): Promise<Chat[]> {
	const querySpec = {
		query: 'SELECT * FROM c WHERE c.userId = @userId',
		parameters: [
			{
				name: '@userId',
				value: userId
			}
		]
	};

	const { resources: chats } = await chatsContainer.items.query<Chat>(querySpec).fetchAll();
	return chats;
}

export async function getChatById(chatId: string) {
	const querySpec = {
		query: 'SELECT * FROM c WHERE c.id = @chatId',
		parameters: [
			{
				name: '@chatId',
				value: chatId
			}
		]
	};

	const { resources: chats } = await chatsContainer.items.query<Chat>(querySpec).fetchAll();
	return chats[0];
}
