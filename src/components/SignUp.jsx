import React, { useState } from "react";
import "./login.css";
import { getUsersMe, signUp } from "../sevices/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = ({user}) => {
  const { setCurrentUser } = user;
  const [data, setData] = useState({
    profilePhotoUrl:
      "https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg",
  });

  const navigator = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSignUp = () => {
    signUp(data).then((response) => {
      localStorage.setItem("accessToken", response.accessToken);
      getUsersMe().then((res) => {
        setCurrentUser(res);
        toast.success("signed up successful");
        navigator("/add-todo");
      }).catch((err)=>{
        toast(err.response.data.message);
      });
    }).catch((err)=>{
      toast.error(err.response.data.message)
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={data?.name}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              onChange={handleChange}
              value={data?.confirmPassword}
            />
          </div>
          <div className="form-btn-group-signup">
            <button
              style={{ width: "100%", cursor: "pointer" }}
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
