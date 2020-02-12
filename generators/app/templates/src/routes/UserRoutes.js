import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/', UserController.getAll);
router.post('/', UserController.addOne);
router.get('/:id', UserController.getOne);
router.put('/:id', UserController.updateOne);
router.delete('/:id', UserController.deleteOne);

export default router;
