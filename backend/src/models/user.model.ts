export class UserClient {
  public id: string;
  public email: string;
  public name: string;
  public created_at: Date;
  public updated_at: Date;

  constructor({
    public_id,
    email,
    name,
    created_at,
    updated_at,
  }: {
    public_id: string;
    email: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  }) {
    this.id = public_id;
    this.email = email;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export class ProjectForUserClient {
  public project!: {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    number_of_users: number;
    description: string;
    starts_at: Date;
    ends_at: Date;
    is_owner: boolean;
  };

  constructor({
    is_owner,
    project,
  }: {
    is_owner: boolean;
    project: {
      public_id: string;
      name: string;
      created_at: Date;
      updated_at: Date;
      _count: {
        users: number;
      };
      description: string;
      starts_at: Date;
      ends_at: Date;
    };
  }) {
    this.project = {
      id: project.public_id,
      name: project.name,
      created_at: project.created_at,
      updated_at: project.updated_at,
      number_of_users: project._count.users,
      description: project.description,
      starts_at: project.starts_at,
      ends_at: project.ends_at,
      is_owner,
    };
  }
}
