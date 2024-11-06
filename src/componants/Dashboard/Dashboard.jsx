import React, { useContext, useState } from "react";
import css from "./dashboard.module.css";
import AssignmentCard from "./DashboardAssignmentCard";
import AssignmentComments from "./AssignmentComments";
import DashboardAssignmentFiles from "./DashboardAssignmentFiles";
import { GlobalContextForApp } from "../../store/authentiation-store";
import { IoRefreshSharp } from "react-icons/io5";
import Loading_wait from "../General/Loading_wait";

const Dashboard = () => {
  const [panel, setpanel] = useState("");
  const [comments, setcomments] = useState();
  const [files, setfiles] = useState();

  const {
    setuserMainComponant,
    getMultipleAssignmentData,
    multipleAssignmentData,
    get_DataForUniqueAssignmentCard,
  } = useContext(GlobalContextForApp);

  const handleClickCards = async (val, id) => {
    let data = await get_DataForUniqueAssignmentCard({
      action: val,
      unique_id: id,
    });
    if (val === "comments") {
      setpanel("comments");
      setcomments({ data: data, unique_id: id });
    } else if (val === "q_files") {
      setfiles(data);
      setpanel("q_files");
    } else if (val === "s_files") {
      setfiles(data);
      setpanel("s_files");
    } else {
      console.log(data);
    }
  };

  const get_assignments_data = async () => {
    setpanel("loading");
    await getMultipleAssignmentData();
    setpanel("");
  };

  return (
    <div className={css.dashboard_container}>
      <div className={css.dashboard_header}>
        <h2 className={css.dashboard_title}>
          Dashboard{" "}
          <button
            type="refresh"
            onClick={() => {
              get_assignments_data();
            }}
            className={css.refreshButton}
          >
            <IoRefreshSharp />
          </button>
        </h2>
        <button
          className={css.close_btn}
          onClick={() => setuserMainComponant("")}
        >
          &times;
        </button>
      </div>
      {panel === "loading" && <Loading_wait />}
      {panel === "comments" && (
        <AssignmentComments
          setpanel={setpanel}
          comments={comments.data}
          unique_id={comments.unique_id}
          refreshChat={handleClickCards}
        />
      )}
      {(panel === "q_files" || panel === "s_files") && (
        <DashboardAssignmentFiles
          panel={panel}
          setpanel={setpanel}
          files={files}
        />
      )}
      <div className={css.assignment_card_container}>
        {multipleAssignmentData?.current?.length > 0 &&
          multipleAssignmentData.current.map((item) => (
            <AssignmentCard
              key={item.unique_id}
              dict={item}
              handleClickCards={handleClickCards}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
