import { useContext, useEffect, useRef, useState } from "react";
import css from "./contact.module.css";
import { GlobalContextForApp } from "../../store/authentiation-store";
import MessageResponse from "../General/MessageResponse";

export default function Contact() {
  const { isAuthenticated } = useContext(GlobalContextForApp);
  const [any_message, setany_message] = useState({ message: "", type: "" });
  const nameref = useRef(null);
  const emailref = useRef(null);
  const titleref = useRef(null);
  const messageref = useRef(null);

  // Clear the values only if not authenticated (optional: useful when switching between auth states)
  useEffect(() => {
    if (!isAuthenticated) {
      nameref.current.value = "";
      emailref.current.value = "";
    }
  }, [isAuthenticated]);

  const sendMessage = async () => {
    // Construct the bodyData inside the sendMessage function
    const messageBodyData = {
      title: titleref.current.value,
      discription: messageref.current.value,
      ...(!isAuthenticated && {
        name: nameref.current.value,
        email: emailref.current.value,
      }),
    };

    try {
      const response = await fetch(
        `http://43.204.218.60/api_new/general-queries${
          !isAuthenticated ? "-new" : ""
        }/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isAuthenticated && {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }),
          },
          body: JSON.stringify(messageBodyData),
        }
      );

      if (response.ok) {
        setany_message({
          message: "Query submitted successfully, you will get a response soon",
          type: "success",
        });
      } else {
        setany_message({
          message: "Query not submitted, an error occurred",
          type: "error",
        });
      }
    } catch (err) {
      console.log(err);
      setany_message({
        message: "Failed to make a request",
        type: "error",
      });
    }
  };

  return (
    <footer className={css.contact_section} id="contact">
      <h2>Contact Us</h2>
      <MessageResponse
        any_message={any_message}
        setany_message={setany_message}
      />
      <form
        className={css.contact_form}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        {!isAuthenticated && (
          <>
            <input
              ref={nameref}
              type="text"
              placeholder="Your Name"
              required
              style={{ border: "1px solid #4CAF50" }}
            />
            <input
              ref={emailref}
              type="email"
              placeholder="Your Email"
              required
              style={{ border: "1px solid #4CAF50" }}
            />
          </>
        )}
        <input
          ref={titleref}
          type="text"
          placeholder="Title"
          required
          style={{ border: "1px solid #4CAF50" }}
        />
        <textarea
          ref={messageref}
          placeholder="Your Query"
          rows="4"
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>

      <div className={css.contact_details}>
        <p>
          Email:{" "}
          <a href="mailto:contact@academicsupport.com">
            contact@academicsupport.com
          </a>
        </p>
        <p>
          WhatsApp:{" "}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            +123 456 7890
          </a>
        </p>
      </div>
    </footer>
  );
}
