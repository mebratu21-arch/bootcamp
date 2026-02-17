export type Priority = 'High' | 'Medium' | 'Low';
export type Category = 'Work' | 'Personal' | 'Other';

export interface Task {
  id: string;
  text: string;
  priority: Priority;
  category: Category;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
  filter: Priority | 'All';
  categoryFilter: Category | 'All';
  theme: 'light' | 'dark';
}
