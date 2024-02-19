export interface IToDos {
  id: string,
  name: string,
  tasks: ITask[]
}

interface ITask {
  id: string,
  name: string,
  description: string,
  Status: string,
  Priority: string,
  taskId: string,
  listId: string,
  subtasks: ITask[]
}