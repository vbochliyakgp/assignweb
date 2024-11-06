import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./dashboardassignmentcard.module.css";
import { GlobalContextForApp } from "../../store/authentiation-store";

const AssignmentCard = ({ dict, handleClickCards }) => {
  const [deleted, setdeleted] = useState(false);
  const { delete_UniqueAssignmentCard } = useContext(GlobalContextForApp);
  const date_formate_options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const hadleDelete = async (val) => {
    let data = await delete_UniqueAssignmentCard({
      action: val,
      unique_id: dict.unique_id,
    });
    console.log("del", data.status);
    if (data.status === 200) {
      setdeleted(true);
    }
  };

  return (
    <>
      {!deleted && (
        <div
          className={css.card}
          style={{
            backgroundColor: dict.is_submitted_by_expert
              ? "#00ff254a"
              : dict.is_negotiated
              ? "#0600ff33"
              : dict.is_commented_by_expert
              ? "#dc000029"
              : "#a4a4a429",
          }}
        >
          <h2>{dict.subject}</h2>
          <p> {dict.description}</p>
          <div className={css.details}>
            <p>
              <strong>Uploaded Files:</strong>{" "}
              {dict.files_submitted_count + " "}
              {dict.files_submitted_count > 0 && (
                <a
                  onClick={(e) => {
                    e.preventDefault;
                    handleClickCards("q_files", dict.unique_id);
                  }}
                >
                  files-
                </a>
              )}
            </p>
            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(dict.submitted_at).toLocaleString(
                "en-US",
                date_formate_options
              )}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(dict.deadline).toLocaleString(
                "en-US",
                date_formate_options
              )}
            </p>
            <p>
              <strong>Amount:</strong> {dict.amount + " " + dict.currency}
            </p>
            {dict.is_submitted_by_expert && (
              <>
                <p>
                  <strong>Solution Files:</strong>{" "}
                  {dict.files_solution_count + " "}
                  {dict.files_solution_count > 0 && (
                    <a
                      onClick={(e) => {
                        e.preventDefault;
                        handleClickCards("s_files", dict.unique_id);
                      }}
                    >
                      files-
                    </a>
                  )}
                </p>
                <p>
                  <strong>Sol. Submitted:</strong>{" "}
                  {new Date(dict.solution_submitted_at).toLocaleString(
                    "en-US",
                    date_formate_options
                  )}
                </p>
              </>
            )}
          </div>
          <div className={css.buttons}>
            <button
              className={css.commentButton}
              disabled={!dict.is_commented_by_expert}
              onClick={() => {
                if (dict.is_commented_by_expert)
                  handleClickCards("comments", dict.unique_id);
              }}
            >
              {dict.is_submitted_by_expert ? "query" : "comments"}
            </button>

            <button
              className={css.cancelButton}
              disabled={
                deleted || (dict.is_negotiated && !dict.is_submitted_by_expert)
              }
              onClick={() => {
                if (
                  !(
                    deleted &&
                    dict.is_negotiated &&
                    !dict.is_submitted_by_expert
                  )
                )
                  hadleDelete("delete");
              }}
            >
              delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentCard;
