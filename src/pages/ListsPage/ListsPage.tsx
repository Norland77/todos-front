import {IListCreate, IToDos} from "../../interfaces/IToDos.ts";
import styles from "./lists-pages.module.scss";
import TaskList from "../../components/TaskList/TaskList.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {todosLoader} from "../../loaders/todosLoader.ts";
import axios from "axios";

const ListsPage = () => {
    const [todos, setTodos] = useState<IToDos[]>([]);

    const [formData, setFormData] = useState<IListCreate>({
        name: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await todosLoader();
            setTodos(data);
        };

        fetchData();
    }, []);

    const updateTodos = async () => {
        const data = await todosLoader();
        setTodos(data);
    };

    const addList = async () => {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/list/create`, {
            name: formData.name,
        });

        await updateTodos()
        setFormData({
            name: ''
        })
    }

    return (
        <div className={styles.body}>
            <div className={styles.body_header}>
                <input type="text" name={'name'} value={formData.name} onChange={handleChange}/>
                <button onClick={addList}>Add new list</button>
            </div>
            <div className={styles.lists}>
                {todos.map((list) => (
                    <TaskList key={list.id} list={list} updateTodos={updateTodos}/>
                ))}
            </div>
        </div>
    );
};

export default ListsPage;
