import React, { useState } from "react";
import "./login.css";
import { getUsersMe, login } from "../sevices/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ user }) => {
  const { setCurrentUser } = user;
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    login(data)
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        getUsersMe().then((res) => {
          setCurrentUser(res);
          toast.success("Logged in successful");
          navigate("/")
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      <div className="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={data?.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              value={data?.password}
            />
          </div>
          <div className="form-btn-group-login">
            <button
              style={{ width: "100%", cursor: "pointer" }}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
