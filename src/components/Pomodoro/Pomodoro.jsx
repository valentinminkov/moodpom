import React, { useEffect, useCallback, useContext } from "react";
import { convertToMinutes } from "../../utils/general";
import Icon from "../Icon/Icon";
import styles from "./Pomodoro.module.scss";
import Button, { BUTTON_THEME } from "../Button/Button";
import { AppContext } from "../../context/AppContext";
import useNotifications from "../../hooks/useNotifications";

import {
  MINUTE,
  SECOND,
  MIN_WORK_DURATION,
  MAX_WORK_DURATION,
  BREAK_LABEL,
  WORK_LABEL,
} from "../../constants.js";

const Pomodoro = () => {
  const { appState, setAppState } = useContext(AppContext);
  const { isBreakPeriod, workDuration, breakDuration, isTimerRunning, time } =
    appState;
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

  // Update the time every second
  useEffect(() => {
    let timer;
    if (isTimerRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, SECOND);
    } else if (isTimerRunning || time === 0) {
      endCycle();
    }
    return () => clearTimeout(timer);
  }, [
    isTimerRunning,
    time,
    isBreakPeriod,
    breakDuration,
    workDuration,
    onSetTime,
    endCycle,
    setTime,
  ]);

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

  // Format the time as a string
  const formatTime = (time) => {
    const minutes = Math.floor(time / MINUTE);
    const seconds = time % MINUTE;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
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

  const renderPomodoroContent = () => {
    return (
      <div>
        <h1 className={styles["pomodoro-header"]}>
          {isBreakPeriod ? BREAK_LABEL : WORK_LABEL}
          <div className={styles.skipButton}>
            <Button
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
              className={`${styles.resetIcon} ${
                !isFullDuration ? styles.display : ""
              }`}
              onClick={resetTimer}
              content={<Icon icon="reset" />}
              theme={BUTTON_THEME.ICON}
            />

            <Button
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
              onClick={decreaseDuration}
              content="-"
              className={styles["duration-value-button"]}
              theme={BUTTON_THEME.SECONDARY}
            />
            <div>
              <span>{isBreakPeriod ? breakDuration : workDuration}</span>
              <Button
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
  };

  return (
    <div
      className={`${styles.pomodoro} ${
        isBreakPeriod
          ? `${styles["pomodoro-break-background"]}`
          : `${styles["pomodor-work-background"]}`
      }`}
    >
      {renderPomodoroContent()}
    </div>
  );
};

export default Pomodoro;
