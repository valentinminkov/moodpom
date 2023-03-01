import React from "react";
import styles from "./BreakContent.module.css";
import { breathingExercises } from "../../dummyData/data";

const BreakContent = ({ className: propClasses }) => {
  return (
    <div className={`${styles["break-content"]} ${propClasses}`}>
      <h1 className={styles.title}>{breathingExercises[0].name}</h1>
      <p className={styles.paragraph}>{breathingExercises[0].description}</p>
    </div>
  );
};

export default BreakContent;
