import { useState } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";

const LoginForm = () => {
  // const navigate = useNavigate();

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!username || !password) {
        throw new Error('Make sure you fill out all required fields');
      }

      const loginCredentials = {
        username,
        password,
      }

      const response = await axios.post('/api/login', loginCredentials);
      console.log(response.data);


    } catch(error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
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