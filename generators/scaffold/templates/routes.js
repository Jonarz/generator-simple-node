import { Router } from 'express';
import <%= controllername %> from '../controllers/<%= controllername %>';

const router = Router();

router.get('/', <%= controllername %>.getAll);
router.post('/', <%= controllername %>.addOne);
router.get('/:id', <%= controllername %>.getOne);
router.put('/:id', <%= controllername %>.updateOne);
router.delete('/:id', <%= controllername %>.deleteOne);

export default router;
