import {IToDos} from "../../interfaces/IToDos.ts";
import {createSlice} from "@reduxjs/toolkit";

interface TodoState {
    todos: IToDos[];
    isLoading: boolean;
    error: string;
}

const initialState: TodoState = {
    todos: [],
    isLoading: false,
    error: ''
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

    }
})

export default todoSlice.reducer;