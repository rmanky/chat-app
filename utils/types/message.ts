export interface Message {
	from: string;
	text: string;
	to: string;
}

export interface Client {
	name: string;
}

export type Post =
	| {
			type: 'message';
			data: Message;
	  }
	| {
			type: 'username';
			data: Client;
	  }
	| {
			type: 'update';
			data: Client;
			success?: boolean;
	  }
	| {
			type: 'list';
			data: Client[];
	  };
