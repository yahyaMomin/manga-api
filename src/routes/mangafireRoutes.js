import { Hono } from 'hono';
import MangafireControllers from '../controllers/mangafireControllers/mangafireControllers';

const router = new Hono();

const mangafireControllers = new MangafireControllers();

router.get('/home', mangafireControllers.getHomepage);

export default router;
