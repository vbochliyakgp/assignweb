import React, { useContext, useEffect, useRef } from "react";
import css from "./assignmentcomments.module.css";
import { GlobalContextForApp } from "../../store/authentiation-store";
import { IoRefreshSharp } from "react-icons/io5";

const AssignmentComments = ({ setpanel, comments, unique_id, refreshChat }) => {
  const new_messageRef = useRef();
  const date_formate_options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const { isAuthenticated } = useContext(GlobalContextForApp);

  const sendMessage = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetch(
          `http://43.204.218.60/api_new/comments/${unique_id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
              comment: new_messageRef.current.value,
            }),
          }
        );
        console.log(`http://43.204.218.60/api_new/comments/${unique_id}/`);

        const data = await response.json();
        if (response.ok) {
          new_messageRef.current.value = "";
          refreshChat("comments", unique_id);
          console.log(data);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    refreshChat("comments", unique_id);

    console.log("comments inside");
    console.log(comments);
  }, []);

  return (
    <div className={css.chatContainer}>
      <div className={css.chatHeader}>
        <h2>
          Comments{" "}
          <button
            type="refresh"
            onClick={() => {
              refreshChat("comments", unique_id);
            }}
            className={css.refreshButton}
          >
            <IoRefreshSharp />
          </button>
        </h2>
        <button className={css.closeButton} onClick={() => setpanel("")}>
          ×
        </button>
      </div>
      <div className={css.messages}>
        {comments?.length > 0 &&
          comments.map((comment, index) => (
            <div
              className={`${css.message} ${
                comment.commented_by === "student" ? css.user : css.expert
              }`}
              key={index}
            >
              <div className={css.username}>
                {comment.commented_by === "student" ? "myself" : "expert"}
              </div>
              <div className={css.text}>{comment.comment}</div>
            </div>
          ))}
        {/* {new Date(comment.commented_at).toLocaleString(
                  "en-US",
                  date_formate_options
                )} */}
        {/* <div className={`${css.message} ${css.user}`}>
          <div className={css.username}>User 1</div>
          <div className={css.text}>Hello! How are you?</div>
        </div> */}
        {/* <div className={`${css.message} ${css.other}`}>
          <div className={css.username}>User 2</div>
          <div className={css.text}>I’m good, thanks! How about you?</div>
        </div> */}
      </div>
      <div className={css.inputArea}>
        <input
          ref={new_messageRef}
          type="text"
          placeholder="Type your message here..."
        />
        <button
          className={css.sendButton}
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AssignmentComments;
