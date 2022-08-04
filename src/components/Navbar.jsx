import React from "react";
import { Link } from "react-router-dom";

const logo = "/img/LogoMakr-4QuB2m.png";

const Navbar = () => {
  return (
    <nav className="header">
      <div className="headerLeft">
        <Link to="/">
          <img className="header__icon" src={logo} alt="" />
        </Link>
        <div className="links">
          <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
            <span>Top Rated</span>
          </Link>
          <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
            <span>Upcoming</span>
          </Link>
          <div className="mode"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
