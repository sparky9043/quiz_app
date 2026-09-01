import { render, screen } from "@testing-library/react";
import QuizPage from "./QuizPage";
import { BrowserRouter } from "react-router";

describe('QuizPage test component', () => {
  it('true is true', () => {
    render(
      <QuizPage />,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByText(/Quiz Page/i)).toBeInTheDocument();
  });
});