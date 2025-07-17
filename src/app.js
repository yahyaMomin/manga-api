import { Hono } from 'hono';
import mangafireRoutes from './routes/mangafireRoutes';
import weebcentralRoutes from './routes/weebcentralRoutes';
import { fail } from './utils/response';
import { AppError } from './utils/error';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import axios from 'axios';

const app = new Hono();

const origins = process.env.ORIGINS ? process.env.ORIGINS : '*';

app.use(logger());
app.use(
  '*',
  cors({
    origin: origins.split(','),
  })
);

app.get('/', (c) => c.json({ message: 'welcome to manga API 🎉' }));
app.get('/health', (c) => c.json({ success: true }));
app.get('/ip', async (c) => {
  const result = await axios.get('https://api64.ipify.org?format=json');
  console.log(result.data);

  return c.json(result.data);
});

app.route('/mangafire', mangafireRoutes);
app.route('/weebcentral', weebcentralRoutes);

app.onError((err, c) => {
  if (err instanceof AppError) {
    return fail(c, err.message, err.statusCode, err.details);
  }
  console.error('Unexpected Error: ' + err.message);
  return fail(c);
});

export default app;
