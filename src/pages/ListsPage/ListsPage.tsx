import {IListCreate} from "../../interfaces/IToDos.ts";
import styles from "./lists-pages.module.scss";
import TaskList from "../../components/TaskList/TaskList.tsx";
import {ChangeEvent, useState} from "react";
import {todoAPI} from "../../services/TodoServices.ts";

const ListsPage = () => {

    const {data: todos, isLoading, error} = todoAPI.useFetchAllTodoQuery('')
    const [createList, {}] = todoAPI.useCreateListMutation()
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

    const addList = async () => {
        event?.preventDefault();
        await createList({name: formData.name})

        setFormData({
            name: ''
        })
    }

    return (
        <div className={styles.body}>
            <form onSubmit={addList} className={styles.body_header}>
                <input type="text" name={'name'} value={formData.name} onChange={handleChange}/>
                <input type={"submit"} />
            </form>
            <div className={styles.lists}>
                {isLoading && <h1>Loading....</h1>}
                {error && <h1>ERROR</h1>}
                {todos && todos.map((list) => (
                    <TaskList key={list.id} list={list}/>
                ))}
            </div>
        </div>
    );
};

export default ListsPage;
