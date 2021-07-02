import WebSocket from 'ws';
import type { Post, Message, Username } from '../types/message';

const { Server } = WebSocket;
const wss = new Server({ port: 8080 });

const usernames: Username[] = [
	{
		uuid: 'all',
		name: 'all'
	}
];

function broadcast(data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState == WebSocket.OPEN && data != undefined) client.send(data);
	});
}

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(msg: string) {
		const post: Post = JSON.parse(msg);
		if (post.type === 'message') {
			const message: Message = post.data;
			const messagePost: Post = {
				type: 'message',
				data: message
			};

			broadcast(JSON.stringify(messagePost));
		} else if (post.type === 'update') {
			const username: Username = post.data;
			const status = updateUsername(username.uuid, username.name);

			const updatePost: Post = {
				type: 'update',
				data: username
			};
			if (status === 'success') {
				broadcast(JSON.stringify(updatePost));
			}
			console.log(usernames);
		}
	});

	const helloMessage: Message = {
		from: 'server',
		text: 'A new user has joined...',
		to: 'all'
	};

	const helloPost: Post = {
		type: 'message',
		data: helloMessage
	};

	broadcast(JSON.stringify(helloPost));
});

function updateUsername(uuid: string, newName: string) {
	if (!isUsernameTaken(newName)) {
		if (!isUUIDTaken(uuid)) {
			usernames.push({
				uuid,
				name: newName
			});
		} else {
			const index = usernames.findIndex(function (username) {
				return username.uuid === uuid;
			});

			usernames.splice(index, 1);
			usernames.push({
				uuid,
				name: newName
			});
		}
		return 'success';
	}
	return 'failure';
}

function isUsernameTaken(name: string) {
	return usernames.filter((value: Username) => value.name === name).length > 0;
}

function isUUIDTaken(uuid: string) {
	return usernames.filter((value: Username) => value.uuid === uuid).length > 0;
}
