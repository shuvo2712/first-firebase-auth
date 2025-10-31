import React from "react";
import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
};

export default NavBar;
