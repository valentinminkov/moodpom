import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("should render the fallback UI when an error is thrown", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const ThrowErrorComponent = () => {
      throw new Error("Error thrown by test");
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    const errorMessage = getByText("Something went wrong.");
    expect(errorMessage).toBeInTheDocument();

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it("should render the children when no error is thrown", () => {
    const ChildComponent = () => <div>Child component</div>;

    const { getByText } = render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    const childComponent = getByText("Child component");
    expect(childComponent).toBeInTheDocument();
  });
});
