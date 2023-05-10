import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SecuredRoute = (props) => {
    
    if(localStorage.getItem("accessToken") != null){
        return props.children;
    }else{
        toast.error("please login")
        return <Navigate to={"/login"}/>
    }
}
