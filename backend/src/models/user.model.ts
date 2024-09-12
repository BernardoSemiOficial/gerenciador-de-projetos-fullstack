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
  public id: string;
  public name: string;
  public created_at: Date;
  public updated_at: Date;
  public number_of_users: number;
  public description: string;
  public starts_at: Date;
  public ends_at: Date;
  public is_owner: boolean;

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
    this.id = project.public_id;
    this.name = project.name;
    this.created_at = project.created_at;
    this.updated_at = project.updated_at;
    this.number_of_users = project._count.users;
    this.description = project.description;
    this.starts_at = project.starts_at;
    this.ends_at = project.ends_at;
    this.is_owner = is_owner;
  }
}
