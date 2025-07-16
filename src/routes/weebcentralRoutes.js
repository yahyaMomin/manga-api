import { Hono } from 'hono';
import handler from '../utils/handler';
import WeebCentralControllers from '../controllers/weebCentralController';

const router = new Hono();
const weebCentralControllers = new WeebCentralControllers();
router.get('/', (c) => {
  return c.text('welcome to weebCentral API 🎉');
});
router.get('/home', handler(weebCentralControllers.getHomepage));
router.get('/list/meta', handler(weebCentralControllers.getListpageMeta));
router.get('/list', handler(weebCentralControllers.getListpage));

export default router;
