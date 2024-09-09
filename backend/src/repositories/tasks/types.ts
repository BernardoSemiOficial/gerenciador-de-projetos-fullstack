export type TasksRespositoryGetTasks = {
  projectId: number;
};

export type TasksRespositoryCreateTask = {
  name: string;
  description: string;
  delivery_time: number;
  statusId: number;
  priorityId: number;
  projectId: number;
};
