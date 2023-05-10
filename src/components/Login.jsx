import React, { useEffect, useState } from "react";
import "./login.css";
import { getUsersMe, login } from "../sevices/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firebaseAuth from "../sevices/firebase";
import firebase from "../sevices/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Login = ({ user }) => {
  const { setCurrentUser } = user;
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [fuser, setfUser] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userf) => {
      setfUser(userf);
      // console.log("Firebase ru asichi - >", userf);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Auth->", res?.user?._delegate?.accessToken);
        localStorage.setItem("accessToken", res?.user?._delegate?.accessToken);
        getUsersMe()
          .then((res) => {
            setCurrentUser(res);
            toast.success("Logged in successful");
            navigate("/");
          })
          .catch((err) => {
            console.log("Some error while me", err);
          });
        console.log("res - >", res?.credential?.idToken);
      });
  };
  const handleLogin = () => {
    login(data)
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        getUsersMe().then((res) => {
          setCurrentUser(res);
          console.log(user.currentUser);
          toast.success("Logged in successful");
          navigate("/");
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
              style={{ width: "140px", cursor: "pointer" }}
              onClick={handleLogin}
            >
              Login <FontAwesomeIcon icon={faRightToBracket} flip/>
            </button>
            <button
              style={{ width: "140px", cursor: "pointer", display: 'flex', justifyContent : 'space-between' }}
              onClick={handleLoginWithGoogle}
            >
              Login with Google <img height={'20px'} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" alt="" />
              {/* Login with <FontAwesomeIcon icon={faGoogleLogo} /> */}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
