import styles from "./task.module.scss";
import {ITask} from "../../interfaces/IToDos.ts";
import ModalWindow from "../ModalWindow/ModalWindow.tsx";
import {useState} from "react";
import axios from "axios";
import ModalEdit from "../ModalEdit/ModalEdit.tsx";

interface PropsType {
    task: ITask
    toggleItem: (itemId: string) => void
    isItemExpanded: (itemId: string) => boolean
    renderSubtasks: (tasks: ITask[]) => JSX.Element | null
    title: string;
    listId: string;
    updateTodos: () => void;
}

const Task = ({ task, toggleItem, isItemExpanded, renderSubtasks, listId, title, updateTodos } : PropsType) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const deleteTask = async (id: string) => {
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/task/delete/${id}`);

        updateTodos()
    }

    return (
        <div key={task.id} className={styles.task}>
            <p>{task.name}</p>
            <p>{task.description}</p>
            <p>{task.Priority}</p>
            <p>{task.Status}</p>
            <div className={styles.buttons}>
                <button onClick={handleShow}>Add Subtask</button>
                <button onClick={() => deleteTask(task.id)}>Delete Task</button>
                <button onClick={handleShowEdit}>Edit Task</button>
            </div>
            <ModalWindow
                show={show}
                handleClose={handleClose}
                title={title}
                listId={listId}
                taskId={task.id}
                updateTodos={updateTodos}
            />
            <ModalEdit
                show={showEdit}
                handleClose={handleCloseEdit}
                title={task.name}
                priority={task.Priority}
                description={task.description}
                updateTodos={updateTodos}
                id={task.id}
                status={task.Status}
            />
            {task.subtasks && task.subtasks.length > 0 && (
                <>
                    <button
                        onClick={() => toggleItem(task.id)}
                        className={styles.toggleButton}
                    >
                        {isItemExpanded(task.id) ? "Hide subtasks" : "Show subtasks"}
                    </button>

                    {isItemExpanded(task.id) && renderSubtasks(task.subtasks)}
                </>
            )}
        </div>
    );
};

export default Task;