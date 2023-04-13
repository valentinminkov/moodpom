import React, { useContext, useEffect } from "react";
import styles from "./App.module.scss";
import { AppContext } from "./context/AppContext";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import BreakContent from "./components/BreakContent/BreakContent";
import useNotifications from "./hooks/useNotifications";

function App() {
  const {
    permission,
    requestNotificationPermission,
    openNotificationSettings,
  } = useNotifications();
  const { appState } = useContext(AppContext);
  const { isBreakPeriod, isRightOn } = appState;

  useEffect(() => {
    if (permission === "default") {
      requestNotificationPermission();
    } else if (permission === "denied") {
      const response = window.confirm(
        "You have blocked notifications. Do you want to change your notification settings?"
      );

      if (response) {
        openNotificationSettings();
      }
    }
  }, [openNotificationSettings, permission, requestNotificationPermission]);

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
