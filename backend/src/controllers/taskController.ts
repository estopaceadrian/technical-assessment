import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/taskService';

const taskService = new TaskService();

export class TaskController {
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.createTask(req.body, req.user!.userId);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.updateTask(
        req.params.id,
        req.body,
        req.user!.userId
      );
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      await taskService.deleteTask(req.params.id, req.user!.userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.getTasks(req.user!.userId);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.getTask(req.params.id, req.user!.userId);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
} 