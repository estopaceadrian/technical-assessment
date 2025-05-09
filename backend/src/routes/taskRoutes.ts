import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { taskSchema } from '../middleware/validation';

const router = Router();
const taskController = new TaskController();

router.use(authenticate);

router.post('/', validate(taskSchema), taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', validate(taskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router; 