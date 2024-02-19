import axios from "axios";
import {IToDos} from "../interfaces/IToDos.ts";

export const todosLoader = async () => {
  let todos: IToDos[] = []

  await axios.get(`${import.meta.env.VITE_SERVER_URL}/list/tasks`).then((res) => {
    todos = res.data
  }).catch(err => {
    console.log(err);
  })

  return todos;
}