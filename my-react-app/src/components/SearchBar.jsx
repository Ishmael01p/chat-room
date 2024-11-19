// import React from 'react';
import '../styles/SearchBar.css'; // Link the modified CSS file

const SearchBar = () => {
  return (
    <div className="search__container">
      <p className="search__title">Go ahead, hover over search</p>
      <input className="search__input" type="text" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
