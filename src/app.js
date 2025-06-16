import { Hono } from 'hono';
import mangafireRoutes from './routes/mangafireRoutes';
import { fail } from './utils/response';
import { AppError } from './utils/error';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'hello world' });
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
