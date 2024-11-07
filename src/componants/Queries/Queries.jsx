import React, { useContext, useEffect, useState, useReducer } from "react";
import QueryCard from "./QueryCard";
import { GlobalContextForApp } from "../../store/authentiation-store";
import { IoRefreshSharp } from "react-icons/io5";
import styles from "./queries.module.css";
import Loading_wait from "../General/Loading_wait";

const ADD_QUERY = "ADD_QUERY";
const REMOVE_QUERY = "REMOVE_QUERY";
const FRESH_QUERIES = "FRESH_QUERIES";
// const ADD_QUERIES = "ADD_QUERIES";

const queriesReducer = (state, action) => {
  switch (action.type) {
    case FRESH_QUERIES:
      return [...action.payload];
    case ADD_QUERY:
      return [...state, action.payload];
    case REMOVE_QUERY:
      return state.filter((query) => query.unique_id !== action.payload);
    default:
      return state;
  }
};

const GeneralQueriesContainer = () => {
  const [panel, setpanel] = useState("");
  const [queries, dispatch] = useReducer(queriesReducer, []);
  const { isAuthenticated, setuserMainComponant } =
    useContext(GlobalContextForApp);

  const Queries_operations = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  const GetQueries = async () => {
    if (isAuthenticated) {
      setpanel("loading");
      try {
        const response = await fetch(
          "http://15.207.99.9:8000/api_new/general-queries/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setpanel("");
        if (response.ok) {
          const data = await response.json();
          Queries_operations(FRESH_QUERIES, data);
          console.log(data);
        } else {
          console.log(`Error: ${response.status}`);
        }
      } catch (err) {
        setpanel("");
        console.log(err);
      }
    }
  };

  const deleteQueryFunction = async (unique_id) => {
    const cnfm = confirm("Are you Sure for Deleting this Query!");
    if (cnfm && isAuthenticated) {
      setpanel("loading");
      try {
        const response = await fetch(
          "http://15.207.99.9:8000/api_new/general-queries/",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
              unique_id: unique_id,
            }),
          }
        );
        setpanel("");
        if (response.ok) {
          Queries_operations(REMOVE_QUERY, unique_id);
        } else {
          console.log(`Error: ${response.status}`);
        }
      } catch (err) {
        setpanel("");
        console.log(err);
      }
    }
  };
  useEffect(() => {
    GetQueries();
  }, []);

  return (
    <div className={styles.container}>
      {panel === "loading" && <Loading_wait />}

      <div className={styles.header}>
        <h2>
          General Queries{" "}
          <button
            onClick={() => {
              GetQueries();
            }}
            className={styles.refreshButton} // Use className instead of style
          >
            <IoRefreshSharp />
          </button>
        </h2>

        <button
          onClick={() => {
            setuserMainComponant("");
          }}
          className={styles.cutButton} // Use className instead of style
        >
          &times;
        </button>
      </div>

      <div className={styles.cardsContainer}>
        {queries.map((query) => (
          <QueryCard
            key={query.unique_id}
            dict={query}
            deleteQueryFunction={deleteQueryFunction}
          />
        ))}
      </div>
    </div>
  );
};

export default GeneralQueriesContainer;
