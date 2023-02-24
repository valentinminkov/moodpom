import React, { useState, useEffect, useCallback } from "react";
import "./Pomodoro.css";
import Button from "../Button/Button";
import EndFlagButton from "../EndFlagButton/EndFlagButton";

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

  const onSetTime = useCallback((newDuration) => {
    const MINUTE = 60; // Define a constant for 1 minute

    if (newDuration > 0) {
      setTime(newDuration * MINUTE);
    }
  }, []);

  // Stop the timer and reset the time
  const resetTimer = () => {
    setIsRunning(false);
    onSetTime(isBreakPeriod ? breakDuration : workDuration);
  };

  const endCycle = useCallback(() => {
    const newDuration = isBreakPeriod ? workDuration : breakDuration;
    setIsRunning(false);
    setIsBreakPeriod(!isBreakPeriod);
    onSetTime(newDuration);
  }, [isBreakPeriod, workDuration, breakDuration, onSetTime]);

  // Update the time every second
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isRunning || time === 0) {
      endCycle();
    }
    return () => clearTimeout(timer);
  }, [
    isRunning,
    time,
    isBreakPeriod,
    breakDuration,
    workDuration,
    onSetTime,
    endCycle,
  ]);

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
