function FilterPanel({ filters, onChange, onClear }) {
  return (
    <aside className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>

        <button
          type="button"
          onClick={onClear}
          className="clear-button"
        >
          Clear
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="state">
          State
        </label>

        <input
          id="state"
          type="text"
          value={filters.state}
          onChange={(event) =>
            onChange("state", event.target.value)
          }
          placeholder="e.g. Delhi"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="city">
          City
        </label>

        <input
          id="city"
          type="text"
          value={filters.city}
          onChange={(event) =>
            onChange("city", event.target.value)
          }
          placeholder="e.g. Bhopal"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="rating">
          Minimum Rating
        </label>

        <select
          id="rating"
          value={filters.minRating}
          onChange={(event) =>
            onChange("minRating", event.target.value)
          }
        >
          <option value="">Any rating</option>
          <option value="3">3+</option>
          <option value="3.5">3.5+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="minFees">
          Minimum Fees
        </label>

        <input
          id="minFees"
          type="number"
          min="0"
          value={filters.minFees}
          onChange={(event) =>
            onChange("minFees", event.target.value)
          }
          placeholder="₹ Minimum"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="maxFees">
          Maximum Fees
        </label>

        <input
          id="maxFees"
          type="number"
          min="0"
          value={filters.maxFees}
          onChange={(event) =>
            onChange("maxFees", event.target.value)
          }
          placeholder="₹ Maximum"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="exam">
          Entrance Exam
        </label>

        <input
          id="exam"
          type="text"
          value={filters.exam}
          onChange={(event) =>
            onChange("exam", event.target.value)
          }
          placeholder="e.g. JEE Main"
        />
      </div>
    </aside>
  );
}

export default FilterPanel;