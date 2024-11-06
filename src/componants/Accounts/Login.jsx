import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./login.module.css";
import { GlobalContextForApp } from "../../store/authentiation-store";
import Loading_wait from "../General/Loading_wait";
import MessageResponse from "../General/MessageResponse";

const Login = () => {
  const [any_message, setany_message] = useState({ message: "", type: "" });
  const [loading, setloading] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { isAuthenticated, LoginUser_function, setuserMainComponant } =
    useContext(GlobalContextForApp);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setloading(true);
      let message = await LoginUser_function(
        usernameRef.current.value,
        passwordRef.current.value
      );
      setloading(false);
      setany_message(message);
    } else {
      setloading(false);
      setany_message({ message: "user already logged in", type: "warning" });
    }
  };
  useEffect(() => {
    console.log(any_message);
  }, [any_message]);
  return (
    <>
      {loading && <Loading_wait />}

      <div className={css.login_component}>
        <button
          className={css.close_button}
          onClick={() => setuserMainComponant("")}
        >
          &times;
        </button>
        <form className={css.login_form} onSubmit={handleLogin}>
          <h2>Login</h2>
          <MessageResponse
            any_message={any_message}
            setany_message={setany_message}
          />
          <input ref={usernameRef} type="email" placeholder="Email" required />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit"> Login</button>
          <div className={css.options}>
            <a
              onClick={(e) => {
                e.preventDefault();
                setuserMainComponant("forgot_password");
              }}
            >
              Forgot Password?
            </a>
            <br />
            <a
              onClick={(e) => {
                e.preventDefault();
                setuserMainComponant("signup");
              }}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
