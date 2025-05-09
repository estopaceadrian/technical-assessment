import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { validate } from '../middleware/validation';
import { userSchema } from '../middleware/validation';

const router = Router();
const userController = new UserController();

router.post('/register', validate(userSchema), userController.register);
router.post('/login', userController.login);

export default router; 