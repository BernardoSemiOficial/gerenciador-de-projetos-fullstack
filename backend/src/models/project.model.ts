export class ProjectClient {
  public id: string;
  public name: string;
  public created_at: Date;
  public updated_at: Date;
  public number_of_users: number;
  public number_of_tasks: number;
  public description: string;
  public starts_at: Date;
  public ends_at: Date;

  constructor({
    project,
  }: {
    project: {
      public_id: string;
      name: string;
      created_at: Date;
      updated_at: Date;
      _count: {
        users: number;
        tasks: number;
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
    this.number_of_tasks = project._count.tasks;
    this.description = project.description;
    this.starts_at = project.starts_at;
    this.ends_at = project.ends_at;
  }
}
