import { Router } from 'express';
import { create, list, read, update, remove } from '../controllers/categories';

const router = Router();

router.get("/category", list);
router.post('/category', create);
router.get('/category/:slug', read);
router.put('/category/:slug', update);
router.delete('/category/:slug', remove);
export default router;
