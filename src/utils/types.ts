export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface Todo {
  name: string;
  completed: boolean;
  id: string;
  description: string;
  priority: Priority;
}
