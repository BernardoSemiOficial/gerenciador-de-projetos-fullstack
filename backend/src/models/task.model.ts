export class TaskClient {
  public id: string;
  public name: string;
  public created_at: Date;
  public updated_at: Date;
  public description: string;
  public delivery_time: number;
  public priority: {
    id: number;
    name: string;
  };
  public status: {
    id: number;
    name: string;
  };

  constructor(task: {
    name: string;
    description: string;
    delivery_time: number;
    public_id: string;
    created_at: Date;
    updated_at: Date;
    priority: {
      id: number;
      name: string;
    };
    status: {
      id: number;
      name: string;
    };
  }) {
    this.id = task.public_id;
    this.name = task.name;
    this.created_at = task.created_at;
    this.updated_at = task.updated_at;
    this.description = task.description;
    this.delivery_time = task.delivery_time;
    this.priority = task.priority;
    this.status = task.status;
  }
}
