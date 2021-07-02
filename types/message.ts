export interface Message {
	from: string;
	text: string;
	to: string;
}

export interface Username {
	uuid: string;
	name: string;
}

export type Post =
	| {
			type: 'message';
			data: Message;
	  }
	| {
			type: 'username';
			data: Username;
	  }
	| {
			type: 'update';
			data: Username;
	  };
