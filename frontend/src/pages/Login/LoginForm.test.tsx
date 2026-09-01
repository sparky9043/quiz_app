import LoginForm from "./LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from "react-router";

describe('LoginForm component', () => {
  it('renders input elements and login button to page', () => {
    render(<LoginForm />, { wrapper: BrowserRouter });

    expect(screen.getByLabelText('username')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument();
  });

  it('allows user to enter value to input elements', async () => {
    const user = userEvent.setup();

    render(<LoginForm />, { wrapper: BrowserRouter });

    const usernameInputEl = screen.getByLabelText<HTMLInputElement>('username');
    const passwordInputEl = screen.getByLabelText<HTMLInputElement>('password');

    await user.type(usernameInputEl, 'ms_rivera');
    await user.type(passwordInputEl, 'password123');

    expect(usernameInputEl.value).toEqual('ms_rivera');
    expect(passwordInputEl.value).toEqual('password123');
  });
});