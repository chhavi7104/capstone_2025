import { useNavigate } from "react-router-dom";
import { useState } from "react";

import useColleges from "../hooks/useColleges";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useColleges({
    page: 1,
    limit: 6,
    sortBy: "rating",
    order: "desc",
  });

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/colleges");
      return;
    }

    navigate(`/colleges?search=${encodeURIComponent(query)}`);
  };

  const colleges = data?.data || [];

  return (
    <div className="home-page">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">COLLEGE DISCOVERY PLATFORM</p>

          <h1>
            Find the right college
            <span> for your future.</span>
          </h1>

          <p className="hero-description">
            Discover colleges, explore courses, compare opportunities,
            and make better education decisions.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search colleges, cities or states..."
              aria-label="Search colleges"
            />

            <button type="submit">
              Explore Colleges
            </button>
          </form>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions section">
        <div className="section-heading">
          <p className="eyebrow">EXPLORE</p>
          <h2>Make your college decision easier</h2>
        </div>

        <div className="action-grid">

          <div className="action-card">
            <h3>Explore Colleges</h3>
            <p>
              Search colleges using location, fees, ratings and more.
            </p>

            <button onClick={() => navigate("/colleges")}>
              Explore →
            </button>
          </div>

          <div className="action-card">
            <h3>Compare Colleges</h3>
            <p>
              Compare colleges side by side before making your choice.
            </p>

            <button onClick={() => navigate("/compare")}>
              Compare →
            </button>
          </div>

          <div className="action-card">
            <h3>College Predictor</h3>
            <p>
              Find colleges based on your entrance exam and rank.
            </p>

            <button onClick={() => navigate("/predictor")}>
              Predict →
            </button>
          </div>

        </div>
      </section>

      {/* Featured Colleges */}
      <section className="featured section">

        <div className="section-heading">
          <p className="eyebrow">TOP COLLEGES</p>
          <h2>Featured Colleges</h2>
        </div>

        {isLoading && (
          <div className="status-message">
            Loading colleges...
          </div>
        )}

        {isError && (
          <div className="status-message error">
            <p>Unable to load featured colleges.</p>

            <button onClick={() => refetch()}>
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !isError && colleges.length === 0 && (
          <div className="status-message">
            No featured colleges available right now.
          </div>
        )}

        {!isLoading && !isError && colleges.length > 0 && (
          <div className="college-grid">
            {colleges.map((college) => (
              <div className="college-card" key={college._id}>

                <div className="college-card-top">
                  <div>
                    <h3>{college.name}</h3>

                    <p>
                      {college.location.city},{" "}
                      {college.location.state}
                    </p>
                  </div>

                  <span className="rating">
                    ★ {college.rating}
                  </span>
                </div>

                <div className="college-card-info">
                  <div>
                    <span>Fees</span>
                    <strong>
                      ₹{college.fees.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <span>Avg. Package</span>
                    <strong>
                      ₹{(
                        college.placements.averagePackage / 100000
                      ).toFixed(1)} LPA
                    </strong>
                  </div>
                </div>

                <button
                  className="secondary-button"
                  onClick={() =>
                    navigate(`/colleges/${college._id}`)
                  }
                >
                  View Details
                </button>

              </div>
            ))}
          </div>
        )}

      </section>

    </div>
  );
}

export default Home;