import React, { useState, useEffect, useCallback } from "react";
import "./Pomodoro.css";
import Button from "../Button/Button";

const Pomodoro = () => {
  const MIN_WORK_DURATION = 1;
  const MAX_WORK_DURATION = 90;
  const BREAK_LABEL = "Break";
  const WORK_LABEL = "Work";

  // Set the duration of the work and break periods in minutes
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  // Set the initial timer state
  const [time, setTime] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreakPeriod, setIsBreakPeriod] = useState(false);

  // Start the timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Define a function that updates the timer's duration based on whether it's a work or break period
  const onSetTime = useCallback(
    (newDuration = -1) => {
      const MINUTE = 60; // Define a constant for 1 minute

      // If "newDuration" is greater than 0, set the timer's duration to that value in minutes
      if (newDuration > 0) {
        setTime(newDuration * MINUTE);
      }
      // Otherwise, if "newDuration" is not provided or is less than or equal to 0,
      // set the timer's duration based on whether it's a work or break period
      else {
        setTime(isBreakPeriod ? breakDuration * MINUTE : workDuration * MINUTE);
      }
    },
    [isBreakPeriod, breakDuration, workDuration]
  );

  // Stop the timer and reset the time
  const resetTimer = () => {
    setIsRunning(false);
    onSetTime(isBreakPeriod ? breakDuration : workDuration);
  };

  // Update the time every second
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isRunning || time === 0) {
      setIsRunning(false);
      setIsBreakPeriod(!isBreakPeriod);
      onSetTime();
    }
    return () => clearTimeout(timer);
  }, [isRunning, time, isBreakPeriod, breakDuration, workDuration, onSetTime]);

  // Format the time as a string
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Decrease work duration by 1 minute
  const decreaseDuration = () => {
    let newDuration = (isBreakPeriod ? breakDuration : workDuration) - 1;

    if (newDuration < MIN_WORK_DURATION) return;

    isBreakPeriod
      ? setBreakDuration(newDuration)
      : setWorkDuration(newDuration);

    onSetTime(newDuration);
  };

  // Increase work duration by 1 minute
  const increaseDuration = () => {
    let newDuration = (isBreakPeriod ? breakDuration : workDuration) + 1;

    if (newDuration === MAX_WORK_DURATION) return;

    isBreakPeriod
      ? setBreakDuration(newDuration)
      : setWorkDuration(newDuration);

    onSetTime(newDuration);
  };

  return (
    <div className="pomodoro">
      <h1 className="pomadoro-header">
        {isBreakPeriod ? BREAK_LABEL : WORK_LABEL}
      </h1>
      <p className="pomadoro-time">{formatTime(time)}</p>
      <div className="button-container">
        <div className="button-container-row">
          <Button onClick={startTimer} text="Start" />
          <Button onClick={resetTimer} text="Reset" />
        </div>

        <div className="button-container-row">
          <Button onClick={decreaseDuration} text="End" />
        </div>
      </div>
      <div className="duration-input">
        <div className="duration-label">Duration (min):</div>
        <div className="duration-value">
          <Button onClick={decreaseDuration} text="-" />
          <div>
            <span>{isBreakPeriod ? breakDuration : workDuration}</span>
            <Button onClick={increaseDuration} text="+" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
