import { Router } from 'express';
import { create, get, list, remove, update } from '../controllers/slide';

const router = Router();

router.get('/slide', list);
router.get('/slide/:id', get);
router.post('/slide', create);
router.delete("/slide/:id", remove);
router.put("/slide/:id", update);

export default router;