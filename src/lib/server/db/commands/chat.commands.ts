import { chatsContainer } from '$lib/server/db/client';
import type { Chat } from '$lib/types/chat';

export async function createChat(chatData: Partial<Chat>): Promise<Chat> {
	const { resource: createdChat } = await chatsContainer.items.create(chatData);
	return createdChat as Chat;
}
