import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Pomodoro from "./Pomodoro";
import { AppContext } from "../../context/AppContext";
import {
  MINUTE,
  MIN_WORK_DURATION,
  MAX_WORK_DURATION,
  BREAK_LABEL,
  WORK_LABEL,
} from "../../constants.js";

jest.useFakeTimers();

const defaultAppState = {
  isBreakPeriod: false,
  workDuration: 25,
  breakDuration: 5,
  isTimerRunning: false,
  time: 25 * MINUTE,
};

const setAppState = jest.fn();

const renderPomodoroWithContext = (appState = defaultAppState) => {
  return render(
    <AppContext.Provider value={{ appState, setAppState }}>
      <Pomodoro />
    </AppContext.Provider>
  );
};

describe("Pomodoro", () => {
  beforeEach(() => {
    setAppState.mockClear();
  });

  it("renders without crashing", () => {
    const { getByText } = renderPomodoroWithContext();
    expect(getByText(WORK_LABEL)).toBeInTheDocument();
  });

  it("toggles between play and pause", () => {
    const appState = {
      ...defaultAppState,
      isTimerRunning: false,
    };
    const { getByTestId, rerender } = renderPomodoroWithContext(appState);
    const playButton = getByTestId("play");

    fireEvent.click(playButton);
    expect(setAppState).toHaveBeenCalledWith({ isTimerRunning: true });

    rerender(
      <AppContext.Provider
        value={{ appState: { ...appState, isTimerRunning: true }, setAppState }}
      >
        <Pomodoro />
      </AppContext.Provider>
    );

    const pauseButton = getByTestId("pause");

    fireEvent.click(pauseButton);
    expect(setAppState).toHaveBeenCalledWith({ isTimerRunning: false });
  });

  it("increments work duration", () => {
    const { getByTestId } = renderPomodoroWithContext();
    const increaseButton = getByTestId("increase");
    fireEvent.click(increaseButton);
    expect(setAppState).toHaveBeenCalledWith({ workDuration: 26 });
  });

  it("decrements work duration", () => {
    const { getByTestId } = renderPomodoroWithContext();
    const decreaseButton = getByTestId("decrease");
    fireEvent.click(decreaseButton);
    expect(setAppState).toHaveBeenCalledWith({ workDuration: 24 });
  });

  it("does not allow work duration below the minimum duration", () => {
    const appState = { ...defaultAppState, workDuration: MIN_WORK_DURATION };
    const { getByTestId } = renderPomodoroWithContext(appState);
    const decreaseButton = getByTestId("decrease");
    fireEvent.click(decreaseButton);
    expect(setAppState).not.toHaveBeenCalled();
  });

  it("does not allow work duration equal to the maximum duration", () => {
    const appState = {
      ...defaultAppState,
      workDuration: MAX_WORK_DURATION - 1,
    };
    const { getByTestId } = renderPomodoroWithContext(appState);
    const increaseButton = getByTestId("increase");

    fireEvent.click(increaseButton);
    expect(setAppState).not.toHaveBeenCalled();
  });

  it("resets the timer", () => {
    const { getByTestId } = renderPomodoroWithContext();
    const resetButton = getByTestId("reset");
    fireEvent.click(resetButton);
    expect(setAppState).toHaveBeenCalledWith({ isTimerRunning: false });
    expect(setAppState).toHaveBeenCalledWith({
      time: defaultAppState.workDuration * MINUTE,
    });
  });

  it("skips to the break cycle", () => {
    const { getByTestId } = renderPomodoroWithContext();
    const skipButton = getByTestId("skip");
    fireEvent.click(skipButton);
    expect(setAppState).toHaveBeenCalledWith({ isBreakPeriod: true });
    expect(setAppState).toHaveBeenCalledWith({ isTimerRunning: false });
    expect(setAppState).toHaveBeenCalledWith({
      time: defaultAppState.breakDuration * MINUTE,
    });
  });

  it("shows break label when in break period", () => {
    const appState = { ...defaultAppState, isBreakPeriod: true };
    const { getByText } = renderPomodoroWithContext(appState);
    expect(getByText(BREAK_LABEL)).toBeInTheDocument();
  });

  it("shows work label when in work period", () => {
    const { getByText } = renderPomodoroWithContext();
    expect(getByText(WORK_LABEL)).toBeInTheDocument();
  });
});
