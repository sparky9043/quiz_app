import LoginPage from "./LoginPage";
import { render, screen } from "@testing-library/react";

describe('Login page', () => {
  it('true is true', () => {
    render(<LoginPage />);

    expect(screen.getByText(/Login to your account/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument();
  });
});