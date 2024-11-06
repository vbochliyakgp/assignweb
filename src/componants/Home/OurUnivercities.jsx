import React from "react";
import styles from "./ourunivercities.module.css";

const universities = [
  {
    name: "Kennesaw State University",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
  {
    name: "Duke University",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
  {
    name: "Central Michigan University",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
  {
    name: "Victoria University",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
  {
    name: "Northern Illinois University",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
  {
    name: "University of California",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
  {
    name: "Miami University",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
  {
    name: "Oxford University",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
  {
    name: "The University of Chicago",
    imgSrc:
      "https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Group_1000002629_e33a353b1a.png",
  },
];

const OurUnivercities = () => {
  return (
    <div className={styles.trustSection}>
      <h3>Trusted by Students Worldwide</h3>
      <h1>Our Services Trusted By Global University Students</h1>

      <div className={styles.universityGrid}>
        {universities.map((university, index) => (
          <div className={styles.universityItem} key={index}>
            <img src={university.imgSrc} alt={university.name} />
            <span>{university.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurUnivercities;
