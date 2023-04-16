import React, { useContext, useEffect, useCallback } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./BreakContent.module.scss";
import useExercises from "../../hooks/useExercises";
import Icon from "../Icon/Icon";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const BreakContent = ({ className: propClasses }) => {
  const { appState = {} } = useContext(AppContext) || {};
  const { isRightOn = false } = appState;
  const { exerciseIndex, exercises, adjustExercise, exercise } = useExercises();

  const handleKeyDown = useCallback(
    (event) => {
      if (event?.keyCode === 37) {
        // Left arrow
        event.preventDefault();
        if (exerciseIndex > 0) {
          adjustExercise();
        }
      } else if (event.keyCode === 39) {
        // Right arrow
        event.preventDefault();
        if (exerciseIndex < exercises.length - 1) {
          adjustExercise(true);
        }
      }
    },
    [exerciseIndex, exercises.length, adjustExercise]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className={`${styles["break-content"]} ${propClasses}`}>
      <div className={styles.container}>
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
              <div className={styles.controlContainer}>
                <div className={styles.iconContainer}>
                  {exerciseIndex > 0 && (
                    <Icon
                      icon="left"
                      className={styles.controlIcon}
                      onClick={() => adjustExercise()}
                    />
                  )}
                </div>
                <h1 className={styles.title}>{exercise.name}</h1>
                <div className={styles.iconContainer}>
                  {exerciseIndex < exercises.length - 1 && (
                    <Icon
                      icon="right"
                      className={styles.controlIcon}
                      onClick={() => adjustExercise(true)}
                    />
                  )}
                </div>
              </div>
              <p className={styles.optionsContainer}>
                {exerciseIndex + 1} / {exercises.length}
              </p>
            </div>
            <p className={styles.paragraph}>{exercise.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakContent;
