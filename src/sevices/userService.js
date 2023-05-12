import axios from "axios"
import { API_URL } from "./http";



export const login = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/users/login`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const signUp = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/users/signup`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getUsersMe = async () =>{
    try {
        const response=await axios.get(`${API_URL}/users/me`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}