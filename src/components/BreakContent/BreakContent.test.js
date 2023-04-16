import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BreakContent from "./BreakContent";
import useExercises from "../../hooks/useExercises";

jest.mock("../../hooks/useExercises");

describe("BreakContent", () => {
  beforeEach(() => {
    useExercises.mockReturnValue({
      exerciseIndex: 1,
      exercises: [{}, {}, {}],
      adjustExercise: jest.fn(),
      exercise: { name: "Test Exercise", description: "Test Description" },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<BreakContent />);
  });

  test("displays the exercise name and description correctly", () => {
    render(<BreakContent />);
    expect(screen.getByText("Test Exercise")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("renders the toggle switch", () => {
    render(<BreakContent />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("displays the correct number of exercises", () => {
    render(<BreakContent />);
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  test("navigates to next exercise on right arrow key press", () => {
    const { container } = render(<BreakContent />);
    fireEvent.keyDown(container, { keyCode: 39 });

    expect(useExercises().adjustExercise).toHaveBeenCalled();
  });

  test("navigates to previous exercise on left arrow key press", () => {
    const { container } = render(<BreakContent />);
    fireEvent.keyDown(container, { keyCode: 37 });

    expect(useExercises().adjustExercise).toHaveBeenCalled();
  });
});
