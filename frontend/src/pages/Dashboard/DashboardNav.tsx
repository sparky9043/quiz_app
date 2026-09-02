import { Link } from "react-router";

const DashboardNav = () => {
  return (
    <nav className="p-4">
      <ul className="flex justify-between items-center">
        <li>
          <Link to='quiz'>Quiz</Link>
        </li>
        <li>
          <button>
            logout
          </button>
        </li>
      </ul>
    </nav>   
  )
}

export default DashboardNav;