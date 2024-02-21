import { Modal } from "react-bootstrap";
import { ChangeEvent, useState } from "react";
import { ITaskCreate } from "../../interfaces/IToDos.ts";
import axios from "axios";
import styles from "./modal-windiw.module.scss";

interface PropsType {
    show: boolean;
    handleClose: () => void;
    title: string;
    listId: string;
    taskId?: string;
    updateTodos: () => void;
}

const ModalWindow = ({ show, handleClose, title, listId, taskId, updateTodos }: PropsType) => {
    const [formData, setFormData] = useState<ITaskCreate>({
        name: '',
        description: '',
        priority: 'Low',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const addTask = async (listId: string, taskId?: string) => {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/task/create/${listId}/${taskId ? taskId : ''}`, {
            name: formData.name,
            description: formData.description,
            priority: formData.priority
        });
        updateTodos();
        handleClose();
        setFormData({
            name: '',
            description: '',
            priority: ''
        })
    };

    return (
        <Modal className={styles.modal} fullscreen={"xxl-down"} size={"xl"} show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    Add task for list {title}
                </Modal.Title>
                <button className={styles.close} onClick={handleClose}>X</button>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <label>Task name</label>
                <input type="text" name={'name'} value={formData.name} onChange={handleChange} />
                <label>Task description</label>
                <textarea name={'description'} value={formData.description} onChange={handleChange} />
                <label>Task priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button onClick={() => addTask(listId, taskId)}>Add Task</button>
            </Modal.Body>
        </Modal>
    );
};

export default ModalWindow;
