import { Router } from 'express';
import { create, get, list, remove, update, getViaSlug } from '../controllers/products';

const router = Router();

router.get('/product', list);
router.get('/product/:slug', getViaSlug);
router.get('/product/:id', get);
router.post('/product', create);
router.delete("/product/:id", remove);
router.put("/product/:id", update);



export default router;
