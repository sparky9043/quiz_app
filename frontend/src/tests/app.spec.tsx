import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('renders the Vite + React heading', () => {
    render(<App />);
    expect(screen.getByText(/Get started/i)).toBeInTheDocument();
  });
});