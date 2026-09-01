import { render, screen } from "@testing-library/react";
import DashboardPage from "./DashboardPage";

describe('DashboardPage Component', () => {
  it('renders Dashboard header', () => {
    render(<DashboardPage />);

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});