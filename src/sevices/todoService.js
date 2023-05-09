import axios from "axios";

export const addTodo = async (data) =>{
    try {
        const response=await axios.post('http://localhost:8085/todos',data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getTodos = async () =>{
    try {
        const response=await axios.get('http://localhost:8085/todos');
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const updateTodoStatus = async (id,status) =>{
    try {
        const response=await axios.patch(`http://localhost:8085/todos/${id}?status=${status}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const deleteTodo = async (id) =>{
    try {
        const response=await axios.delete(`http://localhost:8085/todos/${id}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getTodoById = async (id) =>{
    try {
        const response=await axios.get(`http://localhost:8085/todos/${id}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const updateTodo = async (id,data) =>{
    try {
        const response=await axios.put(`http://localhost:8085/todos/${id}`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

