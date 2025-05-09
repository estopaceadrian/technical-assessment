export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assigned_to?: string;
  created_by: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  due_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
} 