import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const user = await userService.createUser(email, password, name);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await userService.login(email, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
} 