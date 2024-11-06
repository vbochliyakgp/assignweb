// Modal.js
import React from "react";
import styles from "./querymodal.module.css"; // Modular CSS for styling the modal

const QueryModal = ({ isOpen, onClose, dict }) => {
  if (!isOpen) return null;

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>{dict.title}</h2>
        <p>{new Date(dict.created_at).toLocaleString("en-US", dateOptions)}</p>
        <h3>Description:</h3>
        <p>{dict.discription}</p>
        {dict.is_done && (
          <>
            <h3>Solution:</h3>
            <p>
              Solved at:{" "}
              {new Date(dict.solution.created_at).toLocaleString(
                "en-US",
                dateOptions
              )}
            </p>
            <p>{dict.solution.discription}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default QueryModal;
