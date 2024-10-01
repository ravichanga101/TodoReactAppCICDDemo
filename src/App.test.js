import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For custom matchers like toBeInTheDocument
import Calculator from "./App"; // Adjust path based on your structure

test("renders calculator component", () => {
  render(<Calculator />);
  const titleElement = screen.getByText(/Calculator/i);
  expect(titleElement).toBeInTheDocument();
});

test("can input numbers and operators", () => {
  render(<Calculator />);

  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("2"));

  const inputElement = screen.getByRole("textbox");
  expect(inputElement.value).toBe("1+2");
});

test("calculates the result when '=' is clicked", () => {
  render(<Calculator />);

  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("="));

  const result = screen.getByTestId("result");
  expect(result.textContent).toBe("3");
});

test("clears the input and result when 'C' is clicked", () => {
  render(<Calculator />);

  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("="));
  fireEvent.click(screen.getByText("C"));

  const inputElement = screen.getByRole("textbox");
  expect(inputElement.value).toBe(""); // Check input is cleared

  const result = screen.queryByTestId("result");
  expect(result).toBeNull(); // Check result is cleared
});
