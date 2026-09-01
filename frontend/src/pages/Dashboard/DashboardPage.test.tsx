import { render, screen } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { BrowserRouter } from "react-router";

describe('DashboardPage Component', () => {
  it('renders Dashboard header', () => {
    render(<DashboardPage />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});