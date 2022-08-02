import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt=""
          />
        </Link>
        <div className="links">
          <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
            <span>Top Rated</span>
          </Link>
          <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
            <span>Upcoming</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
