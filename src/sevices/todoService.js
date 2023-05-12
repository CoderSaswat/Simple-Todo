import axios from "axios";
import { API_URL } from "./http";

export const addTodo = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/todos`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getTodos = async () =>{
    try {
        const response=await axios.get(`${API_URL}/todos`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const updateTodoStatus = async (id,status) =>{
    try {
        const response=await axios.patch(`${API_URL}/todos/${id}?status=${status}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const deleteTodo = async (id) =>{
    try {
        const response=await axios.delete(`${API_URL}/todos/${id}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getTodoById = async (id) =>{
    try {
        const response=await axios.get(`${API_URL}/todos/${id}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const updateTodo = async (id,data) =>{
    try {
        const response=await axios.put(`https://todo1-saswatkumarpanda515.b4a.run/todos/${id}`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

