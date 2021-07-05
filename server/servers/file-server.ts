import { Application } from 'https://deno.land/x/abc@v1.3.3/mod.ts';
import { cors } from 'https://deno.land/x/abc@v1.3.3/middleware/cors.ts';
import * as Colors from 'https://deno.land/std@0.100.0/fmt/colors.ts';

export function FileServer(): any {
	const app = new Application();
	const port = 3000;
	app
		.get('/', (c) => c.file('./build/index.html'))
		.static('/', './build', cors())
		.start({ port });

	console.log(`${Colors.blue('[INFO]')} File server listening on http://localhost:${port}`);
}
