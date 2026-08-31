import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <nav>
        <Link to="login">login</Link>
      </nav>
      <h1>Welcome to my quiz website</h1>
    </div>
  )
};

export default Home;