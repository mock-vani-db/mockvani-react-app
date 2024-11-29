import React from "react";
import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/insights"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            Insights
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
