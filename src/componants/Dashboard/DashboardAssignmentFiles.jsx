import React, { useEffect } from "react";
import styles from "./dashboardassignmentfiles.module.css";

const DashboardAssignmentFiles = ({ files, setpanel }) => {
  const handleFileClick = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <div className={styles.fileContainer}>
      <div className={styles.header}>
        <h2>Your Files</h2>
        <button className={styles.closeButton} onClick={() => setpanel("")}>
          &times;
        </button>
      </div>
      <div className={styles.fileGrid}>
        {!files.length && (
          <div className={styles.fileCard}>No files here...</div>
        )}
        {files.length > 0 &&
          files.map((file, index) => (
            <div
              className={styles.fileCard}
              key={index}
              onClick={() => handleFileClick(file.file_url)}
            >
              <div className={styles.fileIcon}>
                <img src={file.file_url} alt={"📄"} />
              </div>
              <div className={styles.fileName}>{file.original_name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardAssignmentFiles;
