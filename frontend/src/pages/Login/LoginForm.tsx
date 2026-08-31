const LoginForm = () => {
  const handleLogin = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return(
    <form onSubmit={handleLogin}>
      <h2>Login to your account</h2>

      <button type="submit">login</button>
    </form>
  )

};

export default LoginForm;