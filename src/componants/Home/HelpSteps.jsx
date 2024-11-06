import React, { useContext } from "react";
import styles from "./helpsteps.module.css";
import { GlobalContextForApp } from "../../store/authentiation-store";

const HelpSteps = () => {
  const isWideScreen = window.innerWidth > 915;
  const { isAuthenticated, setuserMainComponant } =
    useContext(GlobalContextForApp);
  return (
    <div className={styles.homeworkHelpContainer}>
      <h2>Task Completion in 4 Steps</h2>
      <p className={styles.subtitle}>It's THAT Simple.</p>

      <div
        className={styles.steps}
        style={{ justifyContent: isWideScreen ? "center" : "flex-start" }}
      >
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          {isAuthenticated && (
            <>
              {" "}
              <h3>Login</h3>
              <p>already Logged in</p>
            </>
          )}
          {!isAuthenticated && (
            <>
              {" "}
              <h3>Sign up</h3>
              <p>
                Fill in your details at{" "}
                <a onClick={() => setuserMainComponant("signup")}>SignUp</a> to
                complete the sign-up process.
              </p>
            </>
          )}
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <h3>Place your order</h3>
          <p>Click on Service, upload Details and place your desired order.</p>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <h3>Make Payment</h3>
          <p>
            Depending on your order, you will get a price quote, after
            discussion you will asked for payment.
          </p>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>4</div>
          <h3>Receive Your Solution & Support</h3>
          <p>
            After payment, you'll get your completed homework before deadline,
            with after work assistance .
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSteps;
