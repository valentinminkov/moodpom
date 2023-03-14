import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./BreakContent.module.scss";
import { breathingExercises, meditationExercises } from "../../dummyData/data";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const BreakContent = ({ className: propClasses }) => {
  const { appState } = useContext(AppContext);
  const { isRightOn } = appState;

  const exercise = isRightOn ? meditationExercises[0] : breathingExercises[0];

  return (
    <div className={`${styles["break-content"]} ${propClasses}`}>
      <div
        className={`${styles.controlSwitch} ${
          isRightOn ? styles.meditateOn : styles.breatheOn
        }`}
      >
        <span className={styles.breatheLabel}>Breathe</span>
        <ToggleSwitch />
        <span className={styles.meditateLabel}> Meditate</span>
      </div>

      <h1 className={styles.title}>{exercise.name}</h1>
      <p className={styles.paragraph}>{exercise.description}</p>
    </div>
  );
};

export default BreakContent;
