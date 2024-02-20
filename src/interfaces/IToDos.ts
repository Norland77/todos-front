export interface IToDos {
  id: string,
  name: string,
  Tasks: ITask[]
}

export interface ITask {
  id: string,
  name: string,
  description: string,
  Status: string,
  Priority: string,
  taskId: string,
  listId: string,
  subtasks: ITask[]
}

export interface ITaskCreate {
  name: string,
  description: string,
  priority: string,
  status?: string
}

export interface IListCreate {
  name: string
}