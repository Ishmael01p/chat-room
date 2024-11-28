// src/components/NavBar.js
// import React from 'react';
import '../styles/NavBar.css'; // Create and style the NavBar-specific CSS if needed

function NavBar() {
  return (
    <>
      <nav>
        <h1>Market Chats</h1>
        <ul className='nav-container1'><div className="nav-search-container">
          <input
            className="nav-search-input"
            type="text"
            placeholder="Search..."
          />
        </div>
          <li><a href="#stocks">Stocks</a></li>
          <li><a href="ETFs">ETFs</a></li>

          <li><a href="#crypto">Crypto</a></li>          
          <li><a href="#about">About</a></li>
          <li><a href="#coming-soon">Coming Soon</a></li>
        </ul>
        <ul>
          <li><a href="#sign-in">Sign In</a></li>
          <li><a href="#sign-u[">Sign Up</a></li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;

