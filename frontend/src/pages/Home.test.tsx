import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe('Home Component', () => {
  it('renders Welcome message', () => {
    render(<Home />);
  
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  })
});