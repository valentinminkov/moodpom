import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./BreakContent.module.scss";
import useExercises from "../../hooks/useExercises";
import Icon from "../Icon/Icon";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const BreakContent = ({ className: propClasses }) => {
  const { appState } = useContext(AppContext);
  const { isRightOn } = appState;
  const { exerciseIndex, exercises, adjustExercise, exercise } = useExercises();

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
      {exercise && (
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            {exerciseIndex > 0 && (
              <Icon
                icon="left"
                className={styles.controlIcon}
                onClick={() => adjustExercise()}
              />
            )}
            <h1 className={styles.title}>{exercise.name}</h1>
            {exerciseIndex < exercises.length - 1 && (
              <Icon
                icon="right"
                className={styles.controlIcon}
                onClick={() => adjustExercise(true)}
              />
            )}
          </div>
          <p className={styles.paragraph}>{exercise.description}</p>
        </div>
      )}
    </div>
  );
};

export default BreakContent;
