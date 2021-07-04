<script type="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import type { Post, Message, Username } from 'types/message';

	const username: Username = {
		uuid: uuidv4(),
		name: ''
	};

	const message: Message = {
		from: username.uuid,
		text: 'default',
		to: 'all'
	};

	let newName: string;
	let messages: Message[] = [];
	let webSocket: WebSocket;

	onMount(() => {
		webSocket = new WebSocket('ws://localhost:8080');

		webSocket.onmessage = function (ev: MessageEvent) {
			const post: Post = JSON.parse(ev.data);
			if (post.type === 'message') {
				const newMessage: Message = post.data;
				messages = [...messages, newMessage];
			} else if (post.type === 'update') {
				const newUsername: Username = post.data;
				if (username.uuid === newUsername.uuid) {
					username.name = newUsername.name;
				}
			}
		};
	});

	function sendMessage() {
		const post: Post = {
			type: 'message',
			data: message
		};

		webSocket.send(JSON.stringify(post));
		message.text = '';
	}

	function sendUsername() {
		const update: Username = {
			uuid: username.uuid,
			name: newName
		};

		const post: Post = {
			type: 'update',
			data: update
		};

		webSocket.send(JSON.stringify(post));
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#each messages as { from, text, to }}
	<p>{from}: {text}</p>
{/each}
<p>UUID: {username.uuid}</p>
<form on:submit|preventDefault={sendUsername}>
	<label>
		Username
		<input bind:value={newName} type="text" />
	</label>
	<button type="submit">Update Username</button>
</form>
<br />
{#if username.name}
	<form on:submit|preventDefault={sendMessage}>
		<label>
			Message
			<input bind:value={message.text} type="text" />
		</label>
		<button type="submit">Send Message</button>
	</form>
{/if}
