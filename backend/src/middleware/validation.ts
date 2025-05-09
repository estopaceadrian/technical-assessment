import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../utils/errors';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  assigned_to: z.string().uuid().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED']),
  due_date: z.string().datetime().optional()
});

export const validate = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(new AppError('Validation error', 400));
    }
  };
}; 