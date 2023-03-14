import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./ToggleSwitch.module.scss";

function ToggleSwitch() {
  const { appState, setAppState } = useContext(AppContext);
  const { isRightOn } = appState;

  function handleToggle() {
    setAppState({ isRightOn: !isRightOn });
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
