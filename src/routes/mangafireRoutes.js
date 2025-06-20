import { Hono } from 'hono';
import MangafireControllers from '../controllers/mangafireControllers/mangafireControllers';
import handler from '../utils/handler';

const router = new Hono();

const mangafireControllers = new MangafireControllers();

router.get('/', (c) => {
  c.json('welcome to mangafire API 🎉');
});
router.get('/home', handler(mangafireControllers.getHomepage));
router.get('/manga/:id', handler(mangafireControllers.getDetailpage));
router.get('/content/:id', handler(mangafireControllers.getContents));
router.get('/read/:id', handler(mangafireControllers.getImages));
router.get('/mangas/:query/:category?', handler(mangafireControllers.getListpage));

export default router;
