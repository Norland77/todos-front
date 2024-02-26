import { ITask, IToDos } from "../../interfaces/IToDos.ts";
import styles from "./task-list.module.scss";
import { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow.tsx";
import Task from "../Task/Task.tsx";
import {todoAPI} from "../../services/TodoServices.ts";

interface TaskListProps {
    list: IToDos;
}

const TaskList = ({ list }: TaskListProps) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [deleteList, {}] = todoAPI.useDeleteListMutation()
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

    const renderTasks = (tasks: ITask[]) => {
        return (
            <div>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        toggleItem={toggleItem}
                        isItemExpanded={isItemExpanded}
                        renderSubtasks={renderTasks}
                        listId={list.id}
                        title={list.name}
                    />
                ))}
            </div>
        );
    };

    const deleteListFunc = async (id: string) => {
        await deleteList(id)
    }

    return (
        <div className={styles.list} key={list.id}>
            <h3>{list.name}</h3>
            <button className={styles.delete} onClick={() => deleteListFunc(list.id)}>Delete list</button>
            {renderTasks(list.Tasks)}
            <ModalWindow
                show={show}
                handleClose={handleClose}
                title={list.name}
                listId={list.id}
            />
            <button onClick={handleShow}>Add Task</button>
        </div>
    );
};

export default TaskList;
