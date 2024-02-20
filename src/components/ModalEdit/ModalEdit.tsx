
import styles from "../ModalWindow/modal-windiw.module.scss";
import {Modal} from "react-bootstrap";
import {ChangeEvent, useState} from "react";
import {ITaskCreate} from "../../interfaces/IToDos.ts";
import axios from "axios";

interface PropsType {
    show: boolean;
    handleClose: () => void;
    id: string;
    title: string;
    description?: string;
    priority: string;
    updateTodos: () => void;
    status: string;
}

const ModalEdit = ({updateTodos, handleClose, title, show, priority, description, id, status}: PropsType) => {

    const [formData, setFormData] = useState<ITaskCreate>({
        name: title,
        description: description ? description : '',
        priority: priority,
        status: status,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const editTask = async (id: string) => {
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/task/edit/${id}`, {
            name: formData.name,
            description: formData.description,
            priority: formData.priority,
            status: formData.status,
        });
        updateTodos();
        handleClose();
    }

    return (
        <Modal className={styles.modal} fullscreen={"sm-down"} size={"xl"} show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    Edit Task: {title}
                </Modal.Title>
                <button className={styles.close} onClick={handleClose}>X</button>
            </Modal.Header>
            <Modal.Body className={styles.body}>
            <label>Task name</label>
                <input type="text" name={'name'} value={formData.name} onChange={handleChange}/>
                <label>Task description</label>
                <textarea name={'description'} value={formData.description} onChange={handleChange}/>
                <label>Task priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <label>Task status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button onClick={() => editTask(id)}>Edit Task</button>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEdit;