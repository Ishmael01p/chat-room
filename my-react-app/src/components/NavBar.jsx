// src/components/NavBar.js
import React from 'react';
import '../styles/NavBar.css'; // Create and style the NavBar-specific CSS if needed

function NavBar() {
  return (
    <nav>
      <h1>Stock Market Chat Rooms</h1>
      <ul>
        <li><a href="#sign in">Sign In</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#rooms">Rooms</a></li>
        <li><a href="#coming soon">Coming soon</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
