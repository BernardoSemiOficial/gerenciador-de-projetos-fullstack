export interface User {
  id: string;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectForUser {
  is_owner: boolean;
  project: {
    _count: {
      users: 1;
    };
    public_id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    starts_at: Date;
    ends_at: Date;
  };
}
