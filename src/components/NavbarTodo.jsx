import React from "react";
import "./navbarTodo.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NavbarTodo = ({ user }) => {
  const { currentUser,setCurrentUser } = user;
  return (
    <>
      <div className="navbar">
        <div>
          <p>TODO APP</p>
        </div>
        <div>
              <Link to={"/add-todo"}>
                <button className="login-signup-button">Add Todo</button>
              </Link>
        </div>
        <div>
        <Link to={"/"}>
                <button className="login-signup-button">View Todos</button>
              </Link>
        </div>
        <div>
          <p><p>{currentUser?.name}</p></p>
        </div>
        <div className="login-signup">
          {currentUser != null ? (
            <div>
              <Link to={"/login"}>
                <button className="login-signup-button" onClick={()=>{
                  localStorage.clear();
                  setCurrentUser(null);
                  toast.success("logged out succesfully");
                  
                }}>Logout</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/signup"}>
                <button className="login-signup-button">Sign Up</button>
              </Link>
              <Link to={"/login"}>
                <button className="login-signup-button">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarTodo;
