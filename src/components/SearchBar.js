import React, { useState } from "react";
import searchIcon from '../search.png';  // Adjust the path if needed


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
  <img src={searchIcon} alt="Search" width="24" height="24" />
</button>

    </form>
  );
};

export default SearchBar;
