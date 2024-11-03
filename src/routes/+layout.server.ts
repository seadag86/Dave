import { error } from '@sveltejs/kit';
import { getUserChats } from '$lib/server/db/queries/chat.queries';
import type { LayoutServerLoad } from './$types';
import type { Chat } from '$lib/types/chat';

export const load: LayoutServerLoad = async ({ depends }) => {
	depends('chat:list');

	try {
		const chats: Chat[] = await getUserChats('foo');
		return {
			chats
		};
	} catch (err) {
		console.error('Error loading user chats:', err);
		throw error(500, 'Failed to load chats');
	}
};
