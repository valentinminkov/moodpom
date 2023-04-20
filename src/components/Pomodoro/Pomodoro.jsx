import React, { useEffect, useCallback, useContext, useState } from "react";
import { convertToMinutes } from "../../utils/general";
import Icon from "../Icon/Icon";
import styles from "./Pomodoro.module.scss";
import Button, { BUTTON_THEME } from "../Button/Button";
import { AppContext } from "../../context/AppContext";
import useNotifications from "../../hooks/useNotifications";
// eslint-disable-next-line
import Worker from "worker-loader!../../workers/timeWorker.js";
import useDocumentTitle from "../../hooks/useDocumentTitle";

import {
  MINUTE,
  MIN_WORK_DURATION,
  MAX_WORK_DURATION,
  BREAK_LABEL,
  WORK_LABEL,
  APP_TITLE,
} from "../../constants.js";

// Format the time as a string
const formatTime = (time) => {
  const minutes = Math.floor(time / MINUTE);
  const seconds = time % MINUTE;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const Pomodoro = () => {
  const { appState = {}, setAppState = () => {} } =
    useContext(AppContext) || {};

  const {
    isBreakPeriod = false,
    workDuration = 0,
    breakDuration = 0,
    isTimerRunning = false,
    time = 0,
  } = appState;

  const [worker, setWorker] = useState(null);

  const envFlag = process.env.NODE_ENV === "development" ? "[DEV] " : "";
  const fullDuration = isBreakPeriod ? breakDuration : workDuration;
  const isFullDuration = fullDuration === time / MINUTE;
  const { showNotificationWithSound, soundNotificationTimeoutId } =
    useNotifications();

  const setTime = useCallback(
    (newTime) => {
      setAppState({
        time: newTime,
      });
    },
    [setAppState]
  );

  const setisTimerRunning = useCallback(
    (isRunning) => {
      setAppState({ isTimerRunning: isRunning });
    },
    [setAppState]
  );

  useDocumentTitle(
    isTimerRunning
      ? formatTime(time) +
          ` | ${isBreakPeriod ? BREAK_LABEL : WORK_LABEL} • ${APP_TITLE}`
      : APP_TITLE,
    envFlag
  );

  // Toggle the timer
  const toggleTimer = () => {
    if (!isTimerRunning) {
      showNotificationWithSound("Dingaling", time * 1000);
    } else {
      showNotificationWithSound(null, null, true);
    }
    setisTimerRunning(!isTimerRunning);
  };

  const onSetTime = useCallback(
    (newDuration) => {
      if (newDuration > 0) {
        setTime(convertToMinutes(newDuration));
      }
    },
    [setTime]
  );

  // Stop the timer and reset the time
  const resetTimer = () => {
    setisTimerRunning(false);
    onSetTime(isBreakPeriod ? breakDuration : workDuration);
  };

  const endCycle = useCallback(() => {
    const newDuration = isBreakPeriod ? workDuration : breakDuration;
    setisTimerRunning(false);
    setAppState({ isBreakPeriod: !isBreakPeriod });
    onSetTime(newDuration);
  }, [
    isBreakPeriod,
    workDuration,
    breakDuration,
    setisTimerRunning,
    setAppState,
    onSetTime,
  ]);

  // Setup worker
  useEffect(() => {
    const timerWorker = new Worker(`../../workers/timeWorker.js`);
    setWorker(timerWorker);

    return () => {
      timerWorker.terminate();
    };
  }, []);

  // Timer tick listener
  useEffect(() => {
    if (worker) {
      const handleTick = (event) => {
        if (event.data.type === "tick" && isTimerRunning && time > 0) {
          setTime(time - 1);
        } else if (isTimerRunning || time === 0) {
          endCycle();
        }
      };

      worker.onmessage = handleTick;
    }

    return () => {
      if (worker) {
        worker.onmessage = null;
      }
    };
  }, [worker, isTimerRunning, time, setTime, endCycle]);

  // Start/stop worker based on the timer running state
  if (worker) {
    if (isTimerRunning) {
      worker.postMessage({ type: "start" });
    } else {
      worker.postMessage({ type: "stop" });
    }
  }

  useEffect(() => {
    if (isTimerRunning && time > 0 && !soundNotificationTimeoutId.current) {
      showNotificationWithSound("Dingaling", time * 1000);
    }
  }, [
    isTimerRunning,
    showNotificationWithSound,
    time,
    soundNotificationTimeoutId,
  ]);

  const setTimeDuration = (newDuration) => {
    isBreakPeriod
      ? setAppState({ breakDuration: newDuration })
      : setAppState({ workDuration: newDuration });
  };

  // Decrease work duration by 1 minute
  const decreaseDuration = () => {
    let newDuration = (isBreakPeriod ? breakDuration : workDuration) - 1;

    if (newDuration < MIN_WORK_DURATION) return;

    setTimeDuration(newDuration);
    onSetTime(newDuration);
  };

  // Increase work duration by 1 minute
  const increaseDuration = () => {
    let newDuration = (isBreakPeriod ? breakDuration : workDuration) + 1;

    if (newDuration === MAX_WORK_DURATION) return;

    setTimeDuration(newDuration);
    onSetTime(newDuration);
  };

  const renderPomodoroContent = useCallback(() => {
    return (
      <div>
        <h1 className={styles["pomodoro-header"]}>
          {isBreakPeriod ? BREAK_LABEL : WORK_LABEL}
          <div className={styles.skipButton}>
            <Button
              dataTestId="skip"
              onClick={endCycle}
              content={<Icon icon="skip" />}
              theme={BUTTON_THEME.ICON}
            />
          </div>
        </h1>
        <div className={styles.timerContainer}>
          <p className={styles["pomodoro-time"]}>{formatTime(time)}</p>
          <div className={styles.buttonContainer}>
            <Button
              dataTestId="reset"
              className={`${styles.resetIcon} ${
                !isFullDuration ? styles.display : ""
              }`}
              onClick={resetTimer}
              content={<Icon icon="reset" />}
              theme={BUTTON_THEME.ICON}
            />

            <Button
              dataTestId={isTimerRunning ? "pause" : "play"}
              onClick={toggleTimer}
              content={
                !isTimerRunning ? <Icon icon="play" /> : <Icon icon="pause" />
              }
              className={styles.playPauseIcon}
              theme={BUTTON_THEME.ICON}
            />
          </div>
        </div>

        <div className={styles["duration-input"]}>
          <div className={styles["duration-value"]}>
            <Button
              dataTestId="decrease"
              onClick={decreaseDuration}
              content="-"
              className={styles["duration-value-button"]}
              theme={BUTTON_THEME.SECONDARY}
            />
            <div>
              <span>{isBreakPeriod ? breakDuration : workDuration}</span>
              <Button
                dataTestId="increase"
                onClick={increaseDuration}
                content="+"
                className={styles["duration-value-button"]}
                theme={BUTTON_THEME.SECONDARY}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    isBreakPeriod,
    BREAK_LABEL,
    WORK_LABEL,
    endCycle,
    time,
    formatTime,
    resetTimer,
    isFullDuration,
    isTimerRunning,
    toggleTimer,
    breakDuration,
    workDuration,
    decreaseDuration,
    increaseDuration,
    styles,
  ]);

  return (
    <div
      className={`${styles.pomodoro} ${
        isBreakPeriod
          ? `${styles["pomodoro-break-background"]}`
          : `${styles["pomodoro-work-background"]}`
      }`}
    >
      {renderPomodoroContent()}
    </div>
  );
};

export default Pomodoro;
