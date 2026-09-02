import { Link, useNavigate } from "react-router";

const DashboardNav = () => {
  const navigate = useNavigate();

  const handleLogout = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // remove user token from local storage
    localStorage.removeItem('userLoginSuccess');
    navigate('/');
  }

  return (
    <nav className="p-4">
      <ul className="flex justify-between items-center">
        <li>
          <Link to='quiz'>Quiz</Link>
        </li>
        <li>
          <form onSubmit={handleLogout}>
            <button type="submit">
              logout
            </button>
          </form>
        </li>
      </ul>
    </nav>   
  )
}

export default DashboardNav;