<script type="ts">
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Post, Message, Client } from '@utils/types/message';

	let newName: string = `Guest#${(Math.random() * 9999).toFixed(0)}`;

	const username: Client = {
		name: ''
	};

	const message: Message = {
		from: '',
		text: 'Hello, World!',
		to: 'all'
	};

	const clients: Client[] = [
		{
			name: 'all'
		},
		{
			name: 'server'
		}
	];

	let alert: string;
	let messages: Message[] = [];
	let webSocket: WebSocket;

	$: if (messages) {
		afterUpdate(() => {
			const element = document.getElementById('messages');
			element.scrollTop = element.scrollHeight;
		});
	}

	onMount(() => {
		webSocket = new WebSocket('ws://localhost:8080');

		webSocket.onmessage = function (ev: MessageEvent) {
			const post: Post = JSON.parse(ev.data);
			if (post.type === 'message') {
				const newMessage: Message = post.data;
				messages = [...messages, newMessage];
			} else if (post.type === 'update') {
				const newUsername: Client = post.data;

				if (post.success) {
					username.name = newUsername.name;
					message.from = newUsername.name;
					console.log('Yep');
				} else {
					console.log('Nope');
					setAlert('That username is taken!');
				}
			}
		};
	});

	function setAlert(alertMessage: string) {
		alert = alertMessage;
		setTimeout(() => (alert = ''), 2500);
	}

	function sendMessage() {
		const post: Post = {
			type: 'message',
			data: message
		};

		webSocket.send(JSON.stringify(post));
		message.text = '';
	}

	function sendUsername() {
		const update: Client = {
			name: newName
		};

		const post: Post = {
			type: 'update',
			data: update
		};

		webSocket.send(JSON.stringify(post));
	}
</script>

<div bg="dark-300" p="4">
	<p text="light-300">Welcome!</p>
</div>

<div id="messages" display="flex" flex="1 col" bg="light-300" p="4" overflow="y-scroll">
	<p>Messages</p>
	{#each messages as { from, text, to }}
		{#if from === 'server'}
			<p bg="orange-300" m="t-2" p="2" border="rounded">{text}</p>
		{:else if from === username.name}
			<p align="self-end" text="right" bg="green-100" m="t-2" p="2" border="rounded">
				{from}: {text}
			</p>
		{:else}
			<p align="self-start" bg="blue-100" m="t-2" p="2" border="rounded">{from}: {text}</p>
		{/if}
	{/each}
</div>
{#if alert}
	<p p="4" text="red-600" transition:fade>{alert}</p>
{/if}
<div bg="gray-300" p="4">
	{#if !username.name}
		<form on:submit|preventDefault={sendUsername}>
			<label for="username"> Username </label>
			<div>
				<input id="username" bind:value={newName} type="text" />
				<button disabled={newName?.length < 1} type="submit">Request Username</button>
			</div>
		</form>
		<br />
	{:else}
		<p>Welcome, {username.name}</p>
		<select>
			{#each clients as client}
				<option value={client}>{client.name}</option>
			{/each}
		</select>
		<form on:submit|preventDefault={sendMessage}>
			<label for="message"> Message </label>
			<div>
				<input id="message" bind:value={message.text} type="text" />
				<button disabled={message.text.length < 1} type="submit">Send Message</button>
			</div>
		</form>
	{/if}
</div>

<style>
	input,
	button {
		@apply border-dark-400;
		@apply border-2;
		@apply rounded;
		@apply p-2;
	}

	button:disabled {
		@apply cursor-default;
		@apply opacity-25;
	}
</style>
