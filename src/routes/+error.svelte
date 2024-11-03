<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	const errorMessages: Record<number, string> = {
		404: 'Oops! Looks like this page took a wrong turn and got lost.',
		500: "Our servers are having a moment. They're meditating on the meaning of life.",
		401: "Hold up! You'll need a VIP pass to access this area.",
		403: 'Sorry, this area is off limits - even to DAVE.',
		429: "Whoa there! You're moving too fast. Let's take it slow.",
		400: "Something's not quite right with that request. Even AI makes mistakes sometimes."
	};

	let message = $state(
		errorMessages[$page.status] || 'Well, this is awkward... Something unexpected happened.'
	);
</script>

<div class="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
	<h1 class="text-4xl font-bold mb-4">Error {$page.status}</h1>
	<p class="text-xl mb-8">{message}</p>
	<p class="text-lg mb-4">{$page.error?.message}</p>

	<Button href="/" variant="default" class="mt-10">Take Me Home</Button>
</div>
