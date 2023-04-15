import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { BUTTON_THEME } from './Button';

describe('Button component', () => {
  test('renders button with content', () => {
    const content = 'Click me';
    render(<Button content={content} />);
    const buttonElement = screen.getByText(content);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    const content = 'Click me';
    const onClick = jest.fn();
    render(<Button content={content} onClick={onClick} />);
    const buttonElement = screen.getByText(content);

    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders button with correct theme class', () => {
    const content = 'Click me';
    const theme = BUTTON_THEME.SECONDARY;
    render(<Button content={content} theme={theme} />);
    const buttonElement = screen.getByText(content);

    expect(buttonElement).toHaveClass(`button-${theme}`);
  });
});
