import { Application } from 'https://deno.land/x/abc@v1.3.3/mod.ts';
import { cors } from 'https://deno.land/x/abc@v1.3.3/middleware/cors.ts';
import * as Colors from 'https://deno.land/std@0.100.0/fmt/colors.ts';

export function FileServer(): void {
	const app = new Application();
	const port = 8080;
	app
		.get('/', (c) => c.file('./client/build/index.html'))
		.static('/', './client/build/', cors())
		.start({ port });

	console.log(`${Colors.blue('[INFO]')} File server listening on http://localhost:${port}`);
}
