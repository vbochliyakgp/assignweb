import { useContext, useEffect, useRef, useState } from "react";
import css from "./signup.module.css";
import { GlobalContextForApp } from "../../store/authentiation-store.jsx";
import Loading_wait from "../General/Loading_wait.jsx";
import MessageResponse from "../General/MessageResponse";

export default function SignUp() {
  const [any_message, setany_message] = useState({ message: "", type: "" });
  const [loading, setloading] = useState(false);
  const { setuserMainComponant } = useContext(GlobalContextForApp);

  const [gender, setGender] = useState("");
  const f_nameRef = useRef(null);
  const l_nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const first_name = f_nameRef.current.value;
    const last_name = l_nameRef.current.value;
    const user_type = "student";
    const email = emailRef.current.value;
    const mobile = mobileRef.current.value;
    const password = passwordRef.current.value;

    setloading(true);
    try {
      const response = await fetch("http://15.207.99.9:8000/api_new/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          user_type: user_type,
          gender: gender,
          email: email,
          mobile: mobile,
          password: password,
        }),
      });
      setloading(false);
      if (response.ok) {
        setany_message({
          message: "Signup successful!, now varify your email",
          type: "success",
        });
      } else {
        const data = await response.json();
        setany_message({
          message: "Signup failed!",
          type: "error",
        });
        console.log(response);
      }
    } catch (err) {
      setloading(false);
      console.log(data.err);
      setany_message({
        message: "Network error. Please try again later",
        type: "error",
      });
    }
  };

  return (
    <>
      {loading && <Loading_wait />}
      <div className={css.signup_component}>
        <button
          className={css.close_button}
          onClick={() => setuserMainComponant("")}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className={css.signup_form}>
          <h2>Create a Account</h2>
          <MessageResponse
            any_message={any_message}
            setany_message={setany_message}
          />
          <div className={css.input_container}>
            <div>
              {" "}
              <input
                type="text"
                placeholder="First Name"
                ref={f_nameRef}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                ref={l_nameRef}
                required
              />
            </div>

            <div className={css.gender_selection}>
              <label>
                <b>Gender</b>
              </label>
              <div>
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="M"
                    checked={gender === "M"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="F"
                    checked={gender === "F"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="O"
                    checked={gender === "O"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
            </div>

            <input
              type="email"
              placeholder="Email Address"
              ref={emailRef}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number (with Country Code)"
              ref={mobileRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>
          <button type="submit" className={css.submit_button}>
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                setuserMainComponant("login");
              }}
            >
              Log In
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
