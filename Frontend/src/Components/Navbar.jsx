import { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div className={`navbar ${isNavOpen ? "open" : ""}`}>
      <div className="logo">
        <img src="/logo.jpg" alt="Logo" />
      </div>
      <div className="menu-icon" onClick={toggleNav}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/user">User</Link>
      </div>
    </div>
  );
};

export default Navbar;
