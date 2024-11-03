import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { client } from '../openai/client';

export async function getChatName(message: string) {
	const messages: ChatCompletionMessageParam[] = [
		{
			role: 'system',
			content:
				'You are a an AI assistant that generates a short title that summarizes the content of this chat. The response must not exceed 144 characters. You MUST NOT use punctuation or special characters.'
		},
		{
			role: 'user',
			content: message
		}
	];

	return await client.chat.completions.create({
		model: 'gpt-4o-mini',
		messages,
		stream: false
	});
}
