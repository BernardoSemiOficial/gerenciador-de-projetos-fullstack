export interface User {
  id: string;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectForUser {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  starts_at: Date;
  ends_at: Date;
  number_of_users: number;
}
