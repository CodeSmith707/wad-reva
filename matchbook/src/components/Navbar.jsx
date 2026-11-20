import React from "react";

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <a className="brand" href="#home" aria-label="MatchBook home">
        <span className="brand-mark" aria-hidden="true">
          M
        </span>
        MatchBook
      </a>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#matches">Matches</a>
        <a href="#bookings">Bookings</a>
      </div>
    </nav>
  );
}

export default Navbar;
