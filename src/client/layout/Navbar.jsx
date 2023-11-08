import { NavLink } from "react-router-dom";

import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
export default function Navbar() {

  return (
    <nav className="top">
      <h1>Student Tracker</h1>
      <menu>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/students">Students</NavLink>
        </li>
      </menu>
    </nav>
  );
}
