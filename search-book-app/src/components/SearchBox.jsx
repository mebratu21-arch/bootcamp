import React from 'react';

const SearchBox = ({ searchField, setSearchField, handleSearch, handleSort, sort }) => {
  return (
    <div className="search-controls">
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search books..." 
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <select value={sort} onChange={handleSort}>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
      </select>
    </div>
  );
};

export default SearchBox;
