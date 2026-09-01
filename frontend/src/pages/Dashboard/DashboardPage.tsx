import { Link } from "react-router";

const DashboardPage = () => {
  return (
    <div>
      <nav>
        <li>
          <Link to='quiz'>Quiz</Link>
        </li>
      </nav>
      <h1>Dashboard</h1>
    </div>
  )
};

export default DashboardPage;