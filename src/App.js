import React, { useContext, useEffect } from "react";
import styles from "./App.module.scss";
import { AppContext } from "./context/AppContext";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import Button from "./components/Button/Button";
import BreakContent from "./components/BreakContent/BreakContent";
import useNotificationPermission from "./hooks/useNotificationPermission";

function App() {
  const [permission, requestNotificationPermission, openNotificationSettings] =
    useNotificationPermission();
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
      {permission === "default" && (
        <Button
          onClick={requestNotificationPermission}
          content={<p>Enable Notifications</p>}
        />
      )}
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
