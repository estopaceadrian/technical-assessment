import { db } from '../config/database';
import { Task } from '../types';
import { AppError } from '../utils/errors';

export class TaskService {
  async createTask(taskData: Partial<Task>, userId: string): Promise<Task> {
    const [task] = await db('tasks')
      .insert({
        ...taskData,
        created_by: userId
      })
      .returning('*');

    return task;
  }

  async updateTask(id: string, taskData: Partial<Task>, userId: string): Promise<Task> {
    const task = await db('tasks').where({ id }).first();
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.created_by !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    const [updatedTask] = await db('tasks')
      .where({ id })
      .update(taskData)
      .returning('*');

    return updatedTask;
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    const task = await db('tasks').where({ id }).first();
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.created_by !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    await db('tasks').where({ id }).delete();
  }

  async getTasks(userId: string): Promise<Task[]> {
    return db('tasks')
      .where({ created_by: userId })
      .orWhere({ assigned_to: userId });
  }

  async getTask(id: string, userId: string): Promise<Task> {
    const task = await db('tasks')
      .where({ id })
      .andWhere(function() {
        this.where({ created_by: userId }).orWhere({ assigned_to: userId });
      })
      .first();

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return task;
  }
} 