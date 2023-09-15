import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch("https://mern-backend-pptc.onrender.com/todos");
    const data = await response.json();
    return data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
    try {
        const response = await axios.post("https://mern-backend-pptc.onrender.com/todos", text)
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

export const completeTodo = createAsyncThunk("todos/completeTodo", async (id) => {
    const response = await fetch(`https://mern-backend-pptc.onrender.com/todos/${id}`, {
        method: "PATCH"
    });
    const data = await response.json();
    return data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
    try {
        const response = await axios.delete(`https://mern-backend-pptc.onrender.com/todos/${id}`).then((res) => {
            console.log(res.data);
        });
        return response.data;
    } catch (err) { 
        console.log(err);
    }
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (id, text) => {
    const response = await fetch(`https://mern-backend-pptc.onrender.com/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });
    const data = await response.json();
    return data;
});

const todosSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        status: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(addTodo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(completeTodo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(completeTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                state.todos[index].completed = action.payload.completed;
            })
            .addCase(completeTodo.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(deleteTodo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                state.todos.splice(index, 1);         
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = "failed";
            })
            .addCase(updateTodo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                state.todos[index].text = action.payload.text;
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.status = "failed";
            })
    },
});

export default todosSlice.reducer;