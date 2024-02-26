import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IListCreate, ITaskCreate, IToDos} from "../interfaces/IToDos.ts";

export const todoAPI = createApi({
    reducerPath: 'todoAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER_URL}`}),
    tagTypes: ['Todo'],
    endpoints: (build) => ({
        fetchAllTodo: build.query<IToDos[], string>({
            query: () => ({
                url: '/list/tasks'
            }),
            providesTags: ['Todo']
        }),
        createList: build.mutation<IListCreate, IListCreate>({
            query: (list) => ({
                url: '/list/create',
                method: 'POST',
                body: list
            }),
            invalidatesTags: ['Todo']
        }),
        deleteList: build.mutation<string, string>({
            query: (id) => ({
                url: `/list/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo']
        }),
        addTask: build.mutation<ITaskCreate, ITaskCreate>({
            query: (task) => ({
                url: `/task/create/${task.listId}/${task.taskId ? task.taskId : ''}`,
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTask: build.mutation<string, string>({
            query: (id) => ({
                url: `/task/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo']
        }),
        editTask: build.mutation<ITaskCreate, ITaskCreate>({
            query: (task) => ({
                url: `/task/edit/${task.id}`,
                method: 'PUT',
                body: task
            }),
            invalidatesTags: ['Todo']
        }),
})
})