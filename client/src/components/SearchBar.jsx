import { useState } from "react";

function SearchBar({ initialValue = "", onSubmit }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form className="listing-search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search colleges, cities or states..."
        aria-label="Search colleges"
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;