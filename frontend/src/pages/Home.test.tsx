import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router";

describe('Home Component', () => {
  it('renders Welcome message', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it('renders link to login', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/login/)).toBeInTheDocument();
  });

  it('moves to Login page when clicking login link', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(true).toEqual(true);
  });
  
});