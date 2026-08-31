import { useState } from "react";

const LoginForm = () => {
  const handleLogin = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username, password);
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