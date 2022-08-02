import { Router } from 'express';
import { create, get, list, remove, update, getViaSlug } from '../controllers/users';

const router = Router();

router.get('/user', list);
router.get('/user/:slug', getViaSlug);
router.get('/user/:id', get);
router.post('/user', create);
router.delete("/user/:id", remove);
router.put("/user/:id", update);



export default router;