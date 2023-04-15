import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import useExercises from "../../hooks/useExercises";
import styles from "./ToggleSwitch.module.scss";

function ToggleSwitch() {
  const { appState = {}, setAppState = () => {} } =
    useContext(AppContext) || {};
  const { isRightOn = false } = appState;
  const { setDefaultExercise } = useExercises();

  function handleToggle() {
    const newState = !isRightOn;
    setAppState({ isRightOn: newState });
    setDefaultExercise(newState);
  }

  return (
    <div
      className={`${styles.toggleSwitch} ${
        isRightOn ? styles.right : styles.left
      }`}
      onClick={handleToggle}
    >
      <div className={styles.toggleSwitchKnob}></div>
    </div>
  );
}

export default ToggleSwitch;
