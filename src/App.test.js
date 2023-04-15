import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { AppContext } from "./context/AppContext";

window.confirm = jest.fn(() => true);

jest.mock("./context/AppContext", () => ({
  AppContext: {
    Provider: ({ children }) => children,
  },
}));

test("renders app", () => {
  const mockAppState = {
    isBreakPeriod: false,
    isRightOn: false,
  };

  const { container } = render(
    <AppContext.Provider value={{ appState: mockAppState }}>
      {AppContext ? <App /> : null}
    </AppContext.Provider>
  );

  // Assert that the Pomodoro component is present
  const pomodoroElement = container.querySelector(".pomodoro-content");
  expect(pomodoroElement).toBeInTheDocument();

  // Assert that the BreakContent component is present
  const breakContentElement = container.querySelector(
    ".break-content-container"
  );
  expect(breakContentElement).toBeInTheDocument();

  // Assert that the initial state of isBreakPeriod is false
  expect(mockAppState.isBreakPeriod).toBe(false);

  // Assert that the initial state of isRightOn is false
  expect(mockAppState.isRightOn).toBe(false);
});
