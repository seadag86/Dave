export type Chat = {
	id: string;
	title: string;
	createdat: string;
	userId: string;
};

export type Message = {
	id: string;
	role: string;
	content: string;
	isNew?: boolean;
	createdat: string;
	userId: string;
	chatId: string;
};
