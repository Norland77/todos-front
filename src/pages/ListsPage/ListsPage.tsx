import { useLoaderData } from "react-router-dom";
import { IToDos } from "../../interfaces/IToDos.ts";

const ListsPage = () => {
  const todos = useLoaderData() as IToDos[];

  const renderSubtasks = (task: any) => {
    if (task.subtasks && task.subtasks.length > 0) {
      return (
        <ul>
          {task.subtasks.map((subtask: any) => (
            <li key={subtask.id}>
              {subtask.name}
              {renderSubtasks(subtask)} {/* Рекурсивный вызов для обработки подзадач */}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div>
      {todos.map((list) => (
        <div key={list.id}>
          <h3>{list.name}</h3>
          <div>
            {list.tasks.map((task) => (
              <div key={task.id}>
                <p>{task.name}</p>
                {renderSubtasks(task)} {/* Вызов функции для отображения подзадач */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListsPage;
