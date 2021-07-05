<script type="ts">
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Post, Message, Client } from '@utils/types/message';

	let newName: string = `Guest #${(Math.random() * 9999).toFixed(0)}`;

	const username: Client = {
		name: ''
	};

	const message: Message = {
		from: '',
		text: 'Hello, World!',
		to: 'All'
	};

	let clients: Client[] = [
		{
			name: 'All'
		},
		{
			name: 'Server'
		}
	];

	let alert: string = '';
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
				} else {
					setAlert('That username is taken!');
				}
			} else if (post.type === 'list') {
				clients = post.data;
				message.to = clients.findIndex((_cl) => _cl.name === message.to) != -1 ? message.to : 'All';
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
	<p text="light-300">Number of users: {clients.length - 2}</p>
</div>
<div id="messages" display="flex" flex="1 col" p="y-4 l-4" overflow="y-scroll">
	<p font="italic">Start of conversation</p>
	{#each messages as { from, text, to }}
		{#if from === 'Server'}
			<p bg="orange-600" m="t-2" p="2" border="rounded">{text}</p>
		{:else}
			<p class={from === username.name ? 'self-end' : 'self-start'} m="t-2">{from} &rarr; {to}</p>
			<p
				class={from === username.name ? 'self-end' : 'self-start'}
				bg="blue-600"
				text="light-300"
				p="2"
				border="rounded"
			>
				{text}
			</p>
		{/if}
	{/each}
</div>
{#if alert}
	<p p="4" bg="red-600" text="light-300" transition:fade>{alert}</p>
{/if}
<div bg="dark-300" p="4">
	{#if !username.name}
		<form on:submit|preventDefault={sendUsername}>
			<label for="username"> Username </label>
			<div m="t-2" display="flex">
				<input flex="1" id="username" bind:value={newName} type="text" />
				<button disabled={newName?.length < 1} type="submit">Request Username</button>
			</div>
		</form>
		<br />
	{:else}
		<p>Welcome, {username.name}</p>
		<label for="to" m="r-1"> Send to</label>
		<select id="to" w="min-12" bind:value={message.to}>
			{#each clients as client (client.name)}
				{#if client.name != 'Server' && client.name != username.name}
					<option value={client.name}>{client.name}</option>
				{/if}
			{/each}
		</select>
		<form m="t-4" on:submit|preventDefault={sendMessage}>
			<div display="flex">
				<input flex="1" id="message" bind:value={message.text} type="text" />
				<button disabled={message.text.length < 1} type="submit">Send Message</button>
			</div>
		</form>
	{/if}
</div>

<style>
	input,
	button {
		@apply border-dark-300;
		@apply border-2;
		@apply rounded;
		@apply p-2;
		@apply text-dark-600;
	}

	select,
	option {
		@apply text-dark-600;
	}

	button {
		@apply bg-blue-600;
		@apply text-light-300;
	}

	button:disabled {
		@apply cursor-default;
		@apply opacity-25;
	}

	#messages::-webkit-scrollbar {
		width: 1rem;
	}

	#messages::-webkit-scrollbar-thumb {
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: padding-box;
		@apply bg-dark-300;
		@apply rounded-full;
	}

	#messages::-webkit-scrollbar-thumb:hover {
		@apply bg-dark-100;
	}
</style>
