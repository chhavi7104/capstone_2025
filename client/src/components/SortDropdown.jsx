function SortDropdown({ sortBy, order, onChange }) {
  const value = `${sortBy}-${order}`;

  const handleChange = (event) => {
    const [newSortBy, newOrder] = event.target.value.split("-");

    onChange({
      sortBy: newSortBy,
      order: newOrder,
    });
  };

  return (
    <div className="sort-control">
      <label htmlFor="sort">
        Sort by
      </label>

      <select
        id="sort"
        value={value}
        onChange={handleChange}
      >
        <option value="rating-desc">
          Rating: High to Low
        </option>

        <option value="rating-asc">
          Rating: Low to High
        </option>

        <option value="fees-asc">
          Fees: Low to High
        </option>

        <option value="fees-desc">
          Fees: High to Low
        </option>

        <option value="name-asc">
          Name: A–Z
        </option>
      </select>
    </div>
  );
}

export default SortDropdown;