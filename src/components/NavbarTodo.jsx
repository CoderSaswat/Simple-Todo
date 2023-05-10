import React from "react";
import "./navbarTodo.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../sevices/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getUsersMe } from "../sevices/userService";
const NavbarTodo = ({ user }) => {
  const { currentUser, setCurrentUser } = user;
  return (
    <>
      <div className="navbar">
        <div>
          <p>TODO APP</p>
        </div>
        {currentUser != null ? (
          <>
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
          </>
        ) : (
          null
        )}
        <div className="user-info">
          <img
            src={currentUser?.profilePhotoUrl}
            alt=""
            style={{ width: "3vw" }}
          />
          <span>{currentUser?.name}</span>
        </div>
        <div className="login-signup">
          {currentUser != null ? (
            <div>
              <Link to={"/login"}>
                <button
                  className="login-signup-button"
                  onClick={() => {
                    localStorage.clear();
                    setCurrentUser(null);
                    firebase.auth().signOut();
                    toast.success("logged out succesfully");
                  }}
                >
                  Logout <FontAwesomeIcon icon={faArrowRightFromBracket} flip />
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/signup"}>
                <button className="login-signup-button">Sign Up <FontAwesomeIcon icon={faUserPlus} flip /></button>
              </Link>
              <Link to={"/login"}>
                <button className="login-signup-button">Login <FontAwesomeIcon icon={faRightToBracket} flip/></button>
              </Link>
              <Link to={"/login-phone"}>
                <button className="login-signup-button">Login with number <FontAwesomeIcon icon={faRightToBracket} flip/></button>
              </Link>
                <button className="login-signup-button" onClick={()=>{
                  firebase.auth().signInAnonymously().then((res)=>{
                    console.log("An", res)
                    localStorage.setItem("accessToken", res?.user?._delegate?.accessToken);
                    getUsersMe().then((res)=>{
                      setCurrentUser(res)
                    }).catch((err)=>{
                      console.log(err)
                    })
                  }).catch((err)=>{
                    console.log(err)
                  })
                }}>Anonymous<FontAwesomeIcon icon={faRightToBracket} flip/></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarTodo;
