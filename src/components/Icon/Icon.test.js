import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon", () => {
  test("renders the correct icon based on the provided prop", () => {
    const { rerender } = render(<Icon icon="play" />);
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();

    rerender(<Icon icon="pause" />);
    expect(screen.getByTestId("pause-icon")).toBeInTheDocument();

    rerender(<Icon icon="reset" />);
    expect(screen.getByTestId("reset-icon")).toBeInTheDocument();

    rerender(<Icon icon="skip" />);
    expect(screen.getByTestId("skip-icon")).toBeInTheDocument();

    rerender(<Icon icon="left" />);
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();

    rerender(<Icon icon="right" />);
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  test("applies the provided className to the icon", () => {
    render(<Icon icon="play" className="test-class" />);
    expect(screen.getByTestId("play-icon")).toHaveClass("test-class");
  });

  test("triggers the onClick event when the icon is clicked", () => {
    const onClick = jest.fn();
    render(<Icon icon="play" onClick={onClick} />);
    fireEvent.click(screen.getByTestId("play-icon"));
    expect(onClick).toHaveBeenCalled();
  });
});
