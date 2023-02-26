import React, { useState, useEffect, useCallback, useContext } from "react";
import { convertToMinutes } from "../../utils/general";
import "./Pomodoro.css";
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

  // Start the timer
  const startTimer = () => {
    setisTimerRunning(true);
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
        <h1 className="pomadoro-header">
          {isBreakPeriod ? BREAK_LABEL : WORK_LABEL}
        </h1>
        <p className="pomadoro-time">{formatTime(time)}</p>
        <div className="button-container">
          <div className="button-group">
            <Button onClick={startTimer} content="Start" />
            <Button onClick={resetTimer} content="Reset" />
          </div>
          <div className="button-group">
            <EndFlagButton onClick={endCycle} />
          </div>
        </div>
        <div className="duration-input">
          <div className="duration-label">Duration (min):</div>
          <div className="duration-value">
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
      className={`pomodoro ${
        isBreakPeriod ? "pomodoro-break-background" : "pomodor-work-background"
      }`}
    >
      {renderPomodoroContent()}
    </div>
  );
};

export default Pomodoro;
