import app from './src/app';
import Bun from 'bun';

const PORT = process.env.PORT || 3000;

const serve = Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log('server is running on PORT ' + serve.port);
