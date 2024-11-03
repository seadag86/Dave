import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { client } from '$lib/server/openai/client';
import type { Message } from '$lib/types/chat';

export const POST: RequestHandler = async ({ request }) => {
	console.log('>>>>>>>>> Send POST request received <<<<<<<<<<');

	try {
		const requestBody = await request.json();
		const requestMessages: ChatCompletionMessageParam[] = requestBody.messages.map(
			(m: Message) => ({
				role: m.role,
				content: m.content
			})
		);

		const completionResponse = await client.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: requestMessages,
			stream: true
		});

		const headers = {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		};

		const stream = new ReadableStream({
			async start(controller) {
				for await (const chunk of completionResponse) {
					controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`);
				}
				controller.close();
			}
		});

		return new Response(stream, { headers });
	} catch (err) {
		console.error('Error:', err);
		throw error(500, { code: 500, message: 'An error occurred while processing your request.' });
	}
};
