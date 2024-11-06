import React, { useContext, useRef, useState } from "react";
import css from "./forgotpassword.module.css";
import { GlobalContextForApp } from "../../store/authentiation-store.jsx";
import Loading_wait from "../General/Loading_wait.jsx";
import MessageResponse from "../General/MessageResponse";

const ForgotPassword = () => {
  const [any_message, setany_message] = useState({ message: "", type: "" });
  const [loading, setloading] = useState(false);
  const emailRef = useRef();

  const { ForgotPassoword_function, setuserMainComponant } =
    useContext(GlobalContextForApp);

  const handleSubmit_forgotPassword = async (e) => {
    e.preventDefault();
    let message = await ForgotPassoword_function(emailRef.current.value);
    setany_message(message);
  };

  return (
    <>
      <div className={css.forgotPasswordOverlay}>
        <div className={css.forgotPasswordContainer}>
          <button
            className={css.closeButton}
            onClick={() => setuserMainComponant("")}
          >
            &times;
          </button>
          <h2>Forgot Password?</h2>
          <p
            style={
              any_message.type == "success"
                ? { color: "green" }
                : any_message.type == "error"
                ? { color: "red" }
                : null
            }
          >
            {any_message.message}
          </p>
          <p>Please enter your email address to reset your password.</p>
          <form onSubmit={handleSubmit_forgotPassword}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              required
              className={css.inputField}
            />
            <button type="submit" className={css.submitButton}>
              Submit
            </button>
          </form>
          <div className={css.footerLinks}>
            <a onClick={() => setuserMainComponant("login")}>Back to Login</a>
            <br />
            <a onClick={() => setuserMainComponant("signup")}>Sign Up</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
