import { handleSocket } from './socket-server.ts';
import { Application, Router, send } from 'https://deno.land/x/oak@v7.7.0/mod.ts';
import * as Colors from 'https://deno.land/std@0.100.0/fmt/colors.ts';

const app = new Application();
const port = 8080;

const router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/ws', async (context) => {
	const sock = await context.upgrade();
	handleSocket(sock)
});

app.use(async (context) => {
	await send(context, context.request.url.pathname, {
		root: `${Deno.cwd()}/client/build/`,
		index: 'index.html'
	});
});

console.log(`${Colors.blue('[INFO]')} Server listening on http://localhost:${port}`);

app.listen({ port });

// .get('/ws', hello)
// .get('/', (c) => c.file('./client/build/index.html'))
// .static('/', './client/build/')
// .start({ port });