import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="brand">
          CollegeScope
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/colleges">Colleges</NavLink>
          <NavLink to="/compare">Compare</NavLink>
          <NavLink to="/predictor">Predictor</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;