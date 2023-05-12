import axios from "axios";

export const addTodo = async (data) =>{
    try {
        const response=await axios.post('https://todo-service-bo5g.onrender.com/todos',data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getTodos = async () =>{
    try {
        const response=await axios.get('https://todo-service-bo5g.onrender.com/todos');
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const updateTodoStatus = async (id,status) =>{
    try {
        const response=await axios.patch(`https://todo-service-bo5g.onrender.com/todos/${id}?status=${status}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const deleteTodo = async (id) =>{
    try {
        const response=await axios.delete(`https://todo-service-bo5g.onrender.com/todos/${id}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getTodoById = async (id) =>{
    try {
        const response=await axios.get(`https://todo-service-bo5g.onrender.com/todos/${id}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const updateTodo = async (id,data) =>{
    try {
        const response=await axios.put(`https://todo-service-bo5g.onrender.com/todos/${id}`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

