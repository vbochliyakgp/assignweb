import React from "react";
import css from "./loading_wait.module.css";

const Loading_wait = () => {
  return (
    <div className={css.Loading_wait_container}>
      <div className={css.spinner}></div>
    </div>
  );
};

export default Loading_wait;
