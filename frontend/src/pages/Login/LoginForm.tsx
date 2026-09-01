import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import type { UserLoginCredentials } from "../../types/user";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginCredentials = {
        username,
        password,
      }
    
      if (!username || !password) {
        throw new Error('Please enter both username and password');
      }

      // ensure user login credential only contains username and password
      const checkUser = (input: unknown): input is UserLoginCredentials => {
        const loginCred = input as UserLoginCredentials

        if (typeof loginCred != 'object') {
          throw new Error('invalid data type');
        }

        if (typeof loginCred == 'object') {
          if (
            ('username' in loginCred && 'password' in loginCred) &&
            (Object.keys(loginCred).length == 2)
          ) {
            return true;
          }
        }

        return false;
      };

      if (!checkUser(loginCredentials)) {
        throw new Error('Make sure you fill out both username and password');
      }

      const response = await axios.post('/api/login', loginCredentials);

      if (localStorage.getItem('userLoginSuccess')) {
        localStorage.removeItem('userLoginSucces');
      }
      
      localStorage.setItem('userLoginSuccess', JSON.stringify(response.data));

      navigate('/dashboard');

    } catch(error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message, { cause: error });
      }
    }
  }

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return(
    <form onSubmit={handleLogin}>
      <ul>
        <li>
          <div>
            <label htmlFor="username">
              username
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
        </li>
        <li>
          <div>
            <label htmlFor="password">
              password
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </li>
        <li>
          <div>
            <button type="submit">login</button>
          </div>
        </li>
      </ul>

    </form>
  )

};

export default LoginForm;