import { error } from '@sveltejs/kit';
import { getChatName } from '$lib/server/openai/helpers';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	console.log('>>>>>>>>> Name POST request received <<<<<<<<<<');

	try {
		const requestBody = await request.json();
		const requestMessage: string = requestBody.message;
		const completionResponse = await getChatName(requestMessage);

		return new Response(JSON.stringify(completionResponse.choices[0].message.content));
	} catch (err) {
		console.error('Error:', err);
		throw error(500, { code: 500, message: 'An error occurred while processing your request.' });
	}
};
