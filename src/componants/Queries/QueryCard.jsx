import React, { useState } from "react";
import QueryModal from "./QueryModal";
import styles from "./querycard.module.css";

const QueryCard = ({ dict, deleteQueryFunction }) => {
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const handleShowMore = () => setIsQueryModalOpen(true);
  const handleCloseQueryModal = () => setIsQueryModalOpen(false);

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const maxDescriptionLength = 90;
  const isLongDescription = dict.discription.length > maxDescriptionLength;
  const isLongSolDescription =
    dict.solution?.discription &&
    dict.solution.discription.length > maxDescriptionLength;

  return (
    <>
      <div className={styles.query_card}>
        <div className={styles.header}>
          <h2>{dict.title}</h2>
          <p>
            {new Date(dict.created_at).toLocaleString("en-US", dateOptions)}
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.content_section}>
            <h3>Description:</h3>
            <p>
              {isLongDescription
                ? `${dict.discription.substring(0, maxDescriptionLength)}...`
                : dict.discription}
              {isLongDescription && (
                <span onClick={handleShowMore} className={styles.showMore}>
                  more
                </span>
              )}
            </p>
          </div>

          {dict.is_done && (
            <div
              className={`${styles.solution_section} ${styles.content_section}`}
            >
              <h3>Solution</h3>
              <p className={styles.section_date}>
                Solved at:{" "}
                {new Date(dict.solution.created_at).toLocaleString(
                  "en-US",
                  dateOptions
                )}
              </p>
              <p>
                {isLongSolDescription
                  ? `${dict.solution.discription.substring(
                      0,
                      maxDescriptionLength
                    )}...`
                  : dict.solution.discription}
                {isLongSolDescription && (
                  <span onClick={handleShowMore} className={styles.showMore}>
                    more
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            onClick={() => deleteQueryFunction(dict.unique_id)}
            className={styles.delete_button}
          >
            Delete
          </button>
        </div>
      </div>

      <QueryModal
        isOpen={isQueryModalOpen}
        onClose={handleCloseQueryModal}
        dict={dict}
      />
    </>
  );
};

export default QueryCard;
