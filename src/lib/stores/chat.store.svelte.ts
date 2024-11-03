import type { Chat } from '$lib/types/chat';

function createchatStore() {
	let userChatsState: Chat[] = $state([]);
	let passedMessagesState: string = $state('');

	return {
		get userChats() {
			return userChatsState;
		},
		get passedMessage() {
			return passedMessagesState;
		},
		createUserChats: (chats: Chat[]) => {
			userChatsState = chats;
		},
		addUserChat: (chat: Chat) => {
			userChatsState = [...userChatsState, chat];
		},
		setPassedMessage: (messages: string) => {
			passedMessagesState = messages;
		}
	};
}
export const chatStore = createchatStore();
