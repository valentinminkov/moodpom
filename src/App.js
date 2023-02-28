import React, { useContext, useEffect } from "react";
import styles from "./App.module.css";
import { AppContext } from "./context/AppContext";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import { addClassWithDelay, removeClassWithDelay } from "./utils/general";
import BreakContent from "./components/BreakContent/BreakContent";

function App() {
  const { appState } = useContext(AppContext);
  const { isBreakPeriod } = appState;
  const breakContentClass = "break-content-container";
  const pomodoroContentClass = "pomodoro-content";

  // Fixes the issue of the animation jumping on switch change
  useEffect(() => {
    if (isBreakPeriod) {
      removeClassWithDelay(styles[breakContentClass], styles["hide"], 0);
      removeClassWithDelay(styles[breakContentClass], styles["closed"], 100);
      removeClassWithDelay(styles[pomodoroContentClass], styles["work"], 100);

      addClassWithDelay(styles[pomodoroContentClass], styles["break"], 100);
      addClassWithDelay(styles[breakContentClass], styles["opened"], 100);
    } else {
      removeClassWithDelay(styles[breakContentClass], styles["opened"], 0);
      removeClassWithDelay(styles[pomodoroContentClass], styles["break"], 0);

      addClassWithDelay(styles[pomodoroContentClass], styles["work"], 0);
      addClassWithDelay(styles[breakContentClass], styles["hide"], 600);
      addClassWithDelay(styles[breakContentClass], styles["closed"], 0);
    }
  }, [isBreakPeriod]);

  // This is to prevent the animation from running on every render
  // and only run it on the initial render
  useEffect(() => {
    if (!isBreakPeriod) {
      addClassWithDelay(styles[breakContentClass], styles["hide"], 0);
    }

    addClassWithDelay(
      styles[pomodoroContentClass],
      isBreakPeriod ? styles["break"] : styles["work"],
      0
    );
    addClassWithDelay(
      styles[breakContentClass],
      isBreakPeriod ? styles["opened"] : styles["closed"],
      0
    );
  }, []);

  return (
    <div className={styles["app-container"]}>
      <div
        className={`${styles["pomodoro-content"]}`}
      >
        <Pomodoro />
      </div>
      <div
        className={`${styles[breakContentClass]}`}
      >
        <BreakContent />
      </div>
    </div>
  );
}

export default App;
