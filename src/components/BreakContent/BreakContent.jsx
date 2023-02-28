import React from "react";
import styles from "./BreakContent.module.css";

const BreakContent = ({ className: propClasses }) => {
  return (
    <div className={`${styles["break-content"]} ${propClasses}`}>
      <h1 className={styles.title}>Lorem ipsum dolor sit amet consectetur.</h1>
      <p className={styles.paragraph}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione placeat
        cupiditate nihil autem ab eius quas dolor ex quo, magnam nemo adipisci
        molestias animi voluptates officia cumque id iusto recusandae!
      </p>
    </div>
  );
};

export default BreakContent;
