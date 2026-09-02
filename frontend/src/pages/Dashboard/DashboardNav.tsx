import { Link } from "react-router";

const DashboardNav = () => {
  return (
    <nav>
      <li>
        <Link to='quiz'>Quiz</Link>
      </li>
    </nav>   
  )
}

export default DashboardNav;