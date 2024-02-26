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
  id?: string,
  name: string,
  description: string,
  priority: string,
  status?: string
  listId?: string
  taskId?: string,
}

export interface IListCreate {
  name: string
}