import { Hono } from 'hono';
import mangafireRoutes from './routes/mangafireRoutes';
import { fail } from './utils/response';
import { AppError } from './utils/error';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';

const app = new Hono();

dotenv.config();

const origins = process.env.ORIGINS ? process.env.ORIGINS.split(',') : '*';

app.use(logger());
app.use(
  '*',
  cors({
    origin: origins,
  })
);

app.get('/', (c) => {
  return c.json({ message: 'welcome to managa API 🎉' });
});
app.get('/health', (c) => {
  return c.json({ success: true });
});
app.route('/mangafire', mangafireRoutes);

app.onError((err, c) => {
  if (err instanceof AppError) {
    return fail(c, err.message, err.statusCode, err.details);
  }
  console.error('unexpacted Error :' + err.message);

  return fail(c);
});

export default app;
