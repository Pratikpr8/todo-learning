export enum Priority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export interface Todo {
  name: string;
  completed: boolean;
  id: string;
  description: string;
  priority: Priority;
}
