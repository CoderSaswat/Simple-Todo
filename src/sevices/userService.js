import axios from "axios"

export const login = async (data) =>{
    try {
        const response=await axios.post('http://localhost:8085/users/login',data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const signUp = async (data) =>{
    try {
        const response=await axios.post('http://localhost:8085/users/signup',data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getUsersMe = async () =>{
    try {
        const response=await axios.get('http://localhost:8085/users/me');
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}