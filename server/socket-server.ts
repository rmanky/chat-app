import type { Post, Message, Client } from '../utils/types/message.ts';
import * as Colors from 'https://deno.land/std@0.100.0/fmt/colors.ts';

import {
	acceptWebSocket,
	isWebSocketCloseEvent,
	WebSocket
} from 'https://deno.land/std@0.100.0/ws/mod.ts';

interface ServerClient extends Client {
	websocket?: WebSocket;
}

const clients: ServerClient[] = [
	{
		name: 'All'
	},
	{
		name: 'Server'
	}
];

export async function handleSocket(ws: any) {
	console.log(`${Colors.yellow('[WAIT]')} User connected, awaiting username.`);

	for await (const ev of ws) {
		if (typeof ev === 'string') {
			const post: Post = JSON.parse(ev);
			if (post.type === 'message') {
				sendPost(post);
			} else if (post.type === 'update') {
				const username: Client = post.data;
				const status = setServerClient(ws, username.name);

				const successPost = serverPostUpdate(username, status === 'success');
				ws.send(JSON.stringify(successPost));
			}
		} else if (isWebSocketCloseEvent(ev)) {
			const client = clients.find((_cl) => _cl.websocket === ws);
			if (client) {
				clients.splice(clients.indexOf(client), 1);
				const disconnectMessage = `${client.name} has disconnected.`;
				const disconnectPost = serverPostMessage(disconnectMessage);
				sendPost(disconnectPost);

				console.log(`${Colors.red('[WARN]')} ${disconnectMessage}`);
			} else {
				console.log(`${Colors.red('[WARN]')} An unknown user disconnected.`);
			}

			updateClients();
		}
	}
}

function broadcast(data: string) {
	if (!data) return;

	clients.forEach(function each(client) {
		if (!client.websocket?.isClosed) {
			client.websocket?.send(data);
		}
	});
}

function sendPost(post: Post) {
	cleanClients();
	updateClients();

	if (post.type === 'message') {
		const message = post.data;

		if (message.to === 'All') {
			broadcast(JSON.stringify(post));
		} else {
			const clientTo = clients.find((_cl) => _cl.name === message.to);
			if (!clientTo?.websocket?.isClosed) clientTo?.websocket?.send(JSON.stringify(post));

			const clientFrom = clients.find((_cl) => _cl.name === message.from);
			if (!clientFrom?.websocket?.isClosed) clientFrom?.websocket?.send(JSON.stringify(post));
		}
	}
}

function serverPostMessage(message: string) {
	const serverMessage: Message = {
		from: 'Server',
		text: message,
		to: 'All'
	};

	const serverPost: Post = {
		type: 'message',
		data: serverMessage
	};

	return serverPost;
}

function serverPostUpdate(username: Client, success: boolean) {
	const serverPost: Post = {
		type: 'update',
		data: username,
		success
	};

	return serverPost;
}

function setServerClient(websocket: WebSocket, name: string) {
	if (!isUsernameTaken(name)) {
		clients.push({
			name,
			websocket
		});

		const welcomeMessage = `Woah! ${name} just joined!`;
		const welcomePost = serverPostMessage(welcomeMessage);
		sendPost(welcomePost);

		console.log(`${Colors.green('[JOIN]')} ${welcomeMessage}`);

		return 'success';
	}
	return 'failure';
}

function cleanClients() {
	clients.forEach(function each(client) {
		if (client.websocket?.isClosed) {
			console.log(`${Colors.red('[WARN]')} Orphaned client, removing.`);
			clients.splice(clients.indexOf(client), 1);
		}
	});
}

function updateClients() {
	const updatePost: Post = {
		type: 'list',
		data: clients
	};

	broadcast(JSON.stringify(updatePost));
}

function isUsernameTaken(name: string) {
	return clients.filter((value) => value.name === name).length > 0;
}
