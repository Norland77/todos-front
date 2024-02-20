import { ITask, IToDos } from "../../interfaces/IToDos.ts";
import styles from "./task-list.module.scss";
import { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow.tsx";
import Task from "../Task/Task.tsx";
import axios from "axios";

interface TaskListProps {
    list: IToDos;
    updateTodos: () => void; // Функция для обновления данных
}

const TaskList = ({ list, updateTodos }: TaskListProps) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleItem = (itemId: string) => {
        setExpandedItems((prevExpandedItems) =>
            prevExpandedItems.includes(itemId)
                ? prevExpandedItems.filter((id) => id !== itemId)
                : [...prevExpandedItems, itemId]
        );
    };

    const isItemExpanded = (itemId: string) => {
        return expandedItems.includes(itemId);
    };

    const renderSubtasks = (tasks: ITask[]) => {
        if (!tasks || tasks.length === 0) return null;

        return (
            <div className={styles.test}>
                {tasks.map((task) => (
                    <Task
                        task={task}
                        toggleItem={toggleItem}
                        isItemExpanded={isItemExpanded}
                        renderSubtasks={renderSubtasks}
                        listId={list.id}
                        title={list.name}
                        updateTodos={updateTodos}
                    />
                ))}
            </div>
        );
    };

    const renderTasks = (tasks: ITask[]) => {
        return (
            <div>
                {tasks.map((task) => (
                    <Task
                        task={task}
                        toggleItem={toggleItem}
                        isItemExpanded={isItemExpanded}
                        renderSubtasks={renderSubtasks}
                        listId={list.id}
                        title={list.name}
                        updateTodos={updateTodos}
                    />
                ))}
            </div>
        );
    };

    const deleteList = async (id: string) => {
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/list/delete/${id}`);

        updateTodos()
    }

    return (
        <div className={styles.list} key={list.id}>
            <button className={styles.delete} onClick={() => deleteList(list.id)}>Delete list</button>
            <h3>{list.name}</h3>
            {renderTasks(list.Tasks)}
            <ModalWindow
                show={show}
                handleClose={handleClose}
                title={list.name}
                listId={list.id}
                updateTodos={updateTodos}
            />
            <button onClick={handleShow}>Add Task</button>
        </div>
    );
};

export default TaskList;
