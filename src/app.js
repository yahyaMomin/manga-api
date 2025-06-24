import { Hono } from 'hono';
import mangafireRoutes from './routes/mangafireRoutes';
import { fail } from './utils/response';
import { AppError } from './utils/error';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

const app = new Hono();

let origins = '*';

app.use(logger());
app.use(
  '*',
  cors({
    origin: origins,
  })
);

app.get('/', (c) => c.json({ message: 'welcome to manga API 🎉' }));
app.get('/health', (c) => c.json({ success: true }));
app.route('/mangafire', mangafireRoutes);

app.onError((err, c) => {
  if (err instanceof AppError) {
    return fail(c, err.message, err.statusCode, err.details);
  }
  console.error('Unexpected Error: ' + err.message);
  return fail(c);
});

export default app;
