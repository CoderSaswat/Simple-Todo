import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SecuredRoute = (props) => {
    if(props.user != null){
        return props.children;
    }else{
        toast.error("please login")
        return <Navigate to={"/login"}/>
    }
}
