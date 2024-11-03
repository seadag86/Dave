import { z } from 'zod';

export const chatSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	createdat: z.string().datetime(),
	userId: z.string()
});

export const messageSchema = z.object({
	id: z.string().uuid(),
	role: z.enum(['user', 'assistant']),
	content: z.string(),
	createdat: z.string().datetime(),
	chatid: z.string().uuid(),
	userid: z.string()
});
