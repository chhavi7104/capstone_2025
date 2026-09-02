
import { useSearchParams } from "react-router-dom";

import CollegeCard from "../components/CollegeCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import SortDropdown from "../components/SortDropdown";
import useColleges from "../hooks/useColleges";
import Pagination from "../components/Pagination";

function Colleges() {
  const [searchParams, setSearchParams] = useSearchParams();

  

  const filters = {
    state: searchParams.get("state") || "",
    city: searchParams.get("city") || "",
    minRating: searchParams.get("minRating") || "",
    minFees: searchParams.get("minFees") || "",
    maxFees: searchParams.get("maxFees") || "",
    exam: searchParams.get("exam") || "",
  };

  const page = Number(searchParams.get("page")) || 1;

  const sortBy = searchParams.get("sortBy") || "rating";
  const order = searchParams.get("order") || "desc";

  const params = {
    page,
    limit: 9,
    sortBy,
    order,
  };

  if (searchParams.get("search")) {
    params.search = searchParams.get("search");
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params[key] = value;
    }
  });

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useColleges(params);

  const colleges = data?.data || [];
  const pagination = data?.pagination;

  

  const updateParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    nextParams.set("page", "1");

    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (value) => {
  updateParams({
    search: value.trim(),
  });
};

  const handleFilterChange = (key, value) => {
    updateParams({
      [key]: value,
    });
  };

  const handleSortChange = ({ sortBy, order }) => {
    updateParams({
      sortBy,
      order,
    });
  };

  const clearFilters = () => {
    setSearchParams({
      page: "1",
      sortBy: "rating",
      order: "desc",
    });
  };

  const handlePageChange = (newPage) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("page", String(newPage));

    setSearchParams(nextParams);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="colleges-page">
      <section className="listing-header">
        <div className="listing-container">
          <p className="eyebrow">COLLEGE DISCOVERY</p>

          <h1>Explore Colleges</h1>

          <p>
            Search and discover colleges based on location,
            fees, ratings and entrance exams.
          </p>

          <SearchBar
  key={searchParams.get("search") || ""}
  initialValue={searchParams.get("search") || ""}
  onSubmit={handleSearchSubmit}
/>
        </div>
      </section>

      <section className="listing-container listing-section">
        <div className="listing-layout">

          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            onClear={clearFilters}
          />

          <main className="listing-results">

            <div className="results-header">
              <div>
                <h2>
                  {pagination?.total || 0} Colleges Found
                </h2>

                {pagination && pagination.total > 0 && (
                  <p>
                    Showing page {pagination.page} of{" "}
                    {pagination.totalPages}
                  </p>
                )}
              </div>

              <SortDropdown
                sortBy={sortBy}
                order={order}
                onChange={handleSortChange}
              />
            </div>

            {isLoading && (
              <div className="status-message">
                Loading colleges...
              </div>
            )}

            {isError && (
              <div className="status-message error">
                <p>Unable to load colleges.</p>

                <button onClick={() => refetch()}>
                  Try Again
                </button>
              </div>
            )}

            {!isLoading && !isError && colleges.length === 0 && (
              <div className="status-message">
                <h3>No colleges found</h3>

                <p>
                  Try changing your search or filters.
                </p>

                <button onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}

            {!isLoading && !isError && colleges.length > 0 && (
              <>
                <div className="college-grid">
                  {colleges.map((college) => (
                    <CollegeCard
                      key={college._id}
                      college={college}
                    />
                  ))}
                </div>

                
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    hasNextPage={pagination.hasNextPage}
                    hasPreviousPage={pagination.hasPreviousPage}
                    onPageChange={handlePageChange}
                  />
                
              </>
            )}

          </main>
        </div>
      </section>
    </div>
  );
}

export default Colleges;