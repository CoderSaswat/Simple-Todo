import React, { useEffect, useState } from "react";
import "./login.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import firebase from "../sevices/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RecaptchaVerifier } from "firebase/auth";
import { getUsersMe } from "../sevices/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignInPhone = ({ user }) => {
  const { setCurrentUser } = user;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("REE", response);
        },
      }
    );

    //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }, []);

  const handleSendVerificationCode = async () => {
    const appVerifier = await window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        console.log("Confirmation result ->", confirmationResult);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVerifyCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const userCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      console.log("User details after verification-> ", userCredential.user);
      localStorage.setItem(
        "accessToken",
        userCredential?.user?._delegate?.accessToken
      );
      getUsersMe()
        .then((res) => {
          setCurrentUser(res);
          toast.success("Loggedin with phone number successful");
          navigator("/");
          console.log(res);
        })
        .catch((err) => {
          console.log("Me err", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {!verificationId ? (
            <>
              <div className="form-group">
                <label htmlFor="email">Phone number</label>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
              </div>
              <button
                style={{ width: "140px", cursor: "pointer", marginTop: "40px" }}
                onClick={handleSendVerificationCode}
                id="sign-in-button"
              >
                Send Otp <FontAwesomeIcon icon={faPaperPlane} flip />
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="password">Enter OTP</label>
                <input
                  type="text"
                  name="password"
                  onChange={(e) => setVerificationCode(e.target.value)}
                  value={verificationCode}
                />
              </div>
              <button
                style={{
                  width: "95px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
                onClick={handleVerifyCode}
              >
                VerifyOtp
                {/* Login with <FontAwesomeIcon icon={faGoogleLogo} /> */}
              </button>
            </>
          )}
        </form>
        <div id="recaptcha" style={{ display: "none" }}></div>
      </div>
    </>
  );
};
