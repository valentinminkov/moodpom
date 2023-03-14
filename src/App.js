import React, { useContext } from "react";
import styles from "./App.module.scss";
import { AppContext } from "./context/AppContext";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import BreakContent from "./components/BreakContent/BreakContent";

function App() {
  const { appState } = useContext(AppContext);
  const { isBreakPeriod, isRightOn } = appState;

  return (
    <div className={styles["app-container"]}>
      <div
        className={`${styles["pomodoro-content"]} ${
          isBreakPeriod ? styles.break : styles.work
        }`}
      >
        <Pomodoro />
      </div>
      <div
        className={`${styles["break-content-container"]} ${
          isBreakPeriod ? styles.opened : styles.closed
        } ${isRightOn ? styles.meditateMode : styles.breatheMode}`}
      >
        <BreakContent
          className={`${styles["break-content"]} ${
            isBreakPeriod ? styles["opened"] : styles["closed"]
          }`}
        />
      </div>
    </div>
  );
}

export default App;
