import React, { useEffect, useCallback, useContext } from "react";
import { convertToMinutes } from "../../utils/general";
import styles from "./Pomodoro.module.css";
import Button from "../Button/Button";
import EndFlagButton from "../EndFlagButton/EndFlagButton";
import { AppContext } from "../../context/AppContext";
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

  // Set the initial timer state

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
      <>
        <h1 className={styles["pomodoro-header"]}>
          {isBreakPeriod ? BREAK_LABEL : WORK_LABEL}
        </h1>
        <p className={styles["pomodoro-time"]}>{formatTime(time)}</p>
        <div className={styles["button-container"]}>
          <div className={styles["button-group"]}>
            <Button
              onClick={toggleTimer}
              content={isTimerRunning ? "Start" : "Pause"}
            />
            <Button onClick={resetTimer} content="Reset" />
          </div>
          <div className={styles["button-group"]}>
            <EndFlagButton onClick={endCycle} />
          </div>
        </div>
        <div className={styles["duration-input"]}>
          <div className={styles["duration-label"]}>Duration (min):</div>
          <div className={styles["duration-value"]}>
            <Button onClick={decreaseDuration} content="-" />
            <div>
              <span>{isBreakPeriod ? breakDuration : workDuration}</span>
              <Button onClick={increaseDuration} content="+" />
            </div>
          </div>
        </div>
      </>
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
