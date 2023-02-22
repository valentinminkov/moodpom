import React, { useState, useEffect, useCallback } from "react";
import "./Pomadoro.css";

const Pomodoro = () => {
  const MIN_WORK_DURATION = 1;
  const MAX_WORK_DURATION = 90;

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

  // Stop the timer and reset the time
  const resetTimer = () => {
    setIsRunning(false);
    setTime(isBreakPeriod ? breakDuration * 60 : workDuration * 60);
  };

  const onTimeSet = useCallback(() => {
    setTime(isBreakPeriod ? breakDuration * 60 : workDuration * 60);
  }, [isBreakPeriod, breakDuration, workDuration]);

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
      onTimeSet();
    }
    return () => clearTimeout(timer);
  }, [isRunning, time, isBreakPeriod, breakDuration, workDuration, onTimeSet]);

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

    setTime(newDuration * 60);
  };

  // Increase work duration by 1 minute
  const increaseDuration = () => {
    let newDuration = (isBreakPeriod ? breakDuration : workDuration) + 1;

    if (newDuration === MAX_WORK_DURATION) return;

    isBreakPeriod
      ? setBreakDuration(newDuration)
      : setWorkDuration(newDuration);

    setTime(newDuration * 60);
  };

  return (
    <div className="pomodoro">
      <h1>{isBreakPeriod ? "Break" : "Work"}</h1>
      <p>{formatTime(time)}</p>
      <div className="button-container">
        <button onClick={startTimer}>Start</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="duration-input">
        <div className="duration-label">Duration (min):</div>
        <div className="duration-value">
          <button onClick={decreaseDuration}>-</button>
          <div>
            <span>{isBreakPeriod ? breakDuration : workDuration}</span>
            <button onClick={increaseDuration}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
