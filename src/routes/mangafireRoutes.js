import { Hono } from 'hono';
import MangafireControllers from '../controllers/mangafireControllers/mangafireControllers';

const router = new Hono();

const mangafireControllers = new MangafireControllers();

router.get('/home', mangafireControllers.getHomepage);
router.get('/manga/:id', mangafireControllers.getDetailpage);
router.get('/mangas/:query/:category?', mangafireControllers.getListpage);

export default router;
