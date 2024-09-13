export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  starts_at: Date;
  ends_at: Date;
  number_of_users: number;
  number_of_tasks: number;
}
