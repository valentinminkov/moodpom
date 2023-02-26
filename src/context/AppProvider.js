import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { convertToMinutes } from "../utils/general";

const VERSION = "0.01";
export const APP_STATE_KEY = `moodpom.state.${VERSION}`;

const defaultState = {
  isBreakPeriod: false,
  workDuration: 25,
  breakDuration: 5,
  isTimerRunning: false,
  time: convertToMinutes(25),
};

function AppProvider(props) {
  const [state, setState] = useState(() => {
    // Get the stored value from local storage, or default to an empty object
    return JSON.parse(localStorage.getItem(APP_STATE_KEY)) || defaultState;
  });

  useEffect(() => {
    // Store the appState object in local storage
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  }, [state]);

  const handleSetAppState = (value) => {
    setState((prevState) => ({ ...prevState, ...value }));
  };

  return (
    <AppContext.Provider
      value={{ appState: state, setAppState: handleSetAppState }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;
