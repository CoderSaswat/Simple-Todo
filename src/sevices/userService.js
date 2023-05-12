import axios from "axios"

export const login = async (data) =>{
    try {
        const response=await axios.post('https://todo-service-bo5g.onrender.com/users/login',data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const signUp = async (data) =>{
    try {
        const response=await axios.post('https://todo-service-bo5g.onrender.com/users/signup',data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getUsersMe = async () =>{
    try {
        const response=await axios.get('https://todo-service-bo5g.onrender.com/users/me');
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}