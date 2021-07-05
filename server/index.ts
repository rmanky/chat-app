import { WebSocketClient, WebSocketServer } from 'https://deno.land/x/websocket@v0.1.1/mod.ts';
import type { Post, Message, Client } from '../utils/types/message.ts';
import * as Colors from 'https://deno.land/std@0.100.0/fmt/colors.ts';

const wss = new WebSocketServer(8080);

interface ServerClient extends Client {
	websocket?: WebSocketClient;
}

const clients: ServerClient[] = [
	{
		name: 'all'
	},
	{
		name: 'server'
	}
];

function broadcast(data: string) {
	if (!data) return;
	clients.forEach(function each(client) {
		if (!client.websocket?.isClosed) {
			client.websocket?.send(data);
		} else {
			console.log(`${Colors.red('[WARN]')} Failed to send message, client disconnected.`);
			clients.splice(clients.indexOf(client), 1);
		}
	});
}

wss.on('connection', function connection(ws: WebSocketClient) {
	ws.on('message', function incoming(msg: string) {
		const post: Post = JSON.parse(msg);
		if (post.type === 'message') {
			sendMessage(post.data);
		} else if (post.type === 'update') {
			const username: Client = post.data;
			const status = setServerClient(ws, username.name);

			const successPost = serverPostUpdate(username, status === 'success');
			ws.send(JSON.stringify(successPost));
		}
	});

	ws.on('close', (o) => {
		const client = clients.find((_cl) => _cl.websocket === ws);
		if (client) {
			clients.splice(clients.indexOf(client), 1);
			const disconnectMessage = `${client.name} has disconnected.`;
			const disconnectPost = serverPostMessage(disconnectMessage);
			broadcast(JSON.stringify(disconnectPost));

			console.log(`${Colors.red('[WARN]')} ${disconnectMessage}`);
		} else {
			console.log(`${Colors.red('[WARN]')} An unknown user disconnected.`);
		}
	});

	console.log(`${Colors.blue('[INIT]')} User connected, awaiting username.`);
});

function serverPostMessage(message: string) {
	const serverMessage: Message = {
		from: 'server',
		text: message,
		to: 'all'
	};

	const serverPost: Post = {
		type: 'message',
		data: serverMessage
	};

	return serverPost;
}

function sendMessage(message: Message) {
	const messagePost: Post = {
		type: 'message',
		data: message
	};

	if (message.to === 'all') {
		broadcast(JSON.stringify(messagePost));
	} else {
		const client = clients.find((_cl) => _cl.name === message.to);
		client?.websocket?.send(JSON.stringify(messagePost));
	}
}

function serverPostUpdate(username: Client, success: boolean) {
	const serverPost: Post = {
		type: 'update',
		data: username,
		success
	};

	return serverPost;
}

function setServerClient(websocket: WebSocketClient, name: string) {
	if (!isUsernameTaken(name)) {
		clients.push({
			name,
			websocket
		});

		const welcomeMessage = `Woah! ${name} just joined!`;
		const helloPost = serverPostMessage(welcomeMessage);
		broadcast(JSON.stringify(helloPost));

		console.log(`${Colors.green('[JOIN]')} ${welcomeMessage}`);

		return 'success';
	}
	return 'failure';
}

function isUsernameTaken(name: string) {
	return clients.filter((value) => value.name === name).length > 0;
}
