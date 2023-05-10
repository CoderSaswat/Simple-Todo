import React, { useEffect, useState } from "react";
import NavbarTodo from "./components/NavbarTodo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { getUsersMe } from "./sevices/userService";
import AddTodo from "./components/AddTodo";
import { ViewTodos } from "./components/ViewTodos";
import { SecuredRoute } from "./components/SecuredRoute";
import "@fortawesome/fontawesome-svg-core/styles.css";
import UpdateTodo from "./components/UpdateTodo";
import { SignInPhone } from "./components/SignInPhone";

const App = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("accessToken") != null) {
      getUsersMe()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  axios.interceptors.request.use(
    (request) => {
      setIsLoader(true);
      const token = localStorage.getItem("accessToken");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return Promise.resolve(request);
    },
    (error) => {
      setIsLoader(false);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      setIsLoader(false);
      return Promise.resolve(response);
    },
    (error) => {
      setIsLoader(false);
      return Promise.reject(error);
    }
  );
  return (
    <>
      <BrowserRouter>
        <NavbarTodo user={{ currentUser, setCurrentUser }} />
        <ToastContainer position="bottom-left" autoClose={1000} closeOnClick />
        <ThreeCircles
          height="50"
          width="50"
          color="#4fa94d"
          wrapperStyle={{
            position: "absolute",
            top: "50%",
            right: "50%",
          }}
          wrapperClass=""
          visible={isLoader}
          ariaLabel="three-circles-rotating"
          outerCircleColor="black"
          innerCircleColor="red"
          middleCircleColor="green"
        />
        <Routes>
          <Route
            path="/login"
            element={<Login user={{ currentUser, setCurrentUser }} />}
          />
          <Route
            path="/signup"
            element={<SignUp user={{ currentUser, setCurrentUser }} />}
          />
          <Route
            path="/add-todo"
            element={
              <SecuredRoute user={currentUser}>
                <AddTodo />
              </SecuredRoute>
            }
          />
          <Route
            path="/"
            element={
              <SecuredRoute user={currentUser}>
                <ViewTodos />
              </SecuredRoute>
            }
          />
          <Route path="/update-todo/:id" element={<UpdateTodo />} />
          <Route path="/login-phone" element={<SignInPhone />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
