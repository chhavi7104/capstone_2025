import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import useCompare from "../context/useCompare";
import { compareColleges } from "../services/collegeApi";
import { getComparisonWinners } from "../utils/comparison";

function Compare() {
  const navigate = useNavigate();

  const {
    compareColleges: selectedColleges,
    removeFromCompare,
    clearCompare,
  } = useCompare();

  const collegeIds = selectedColleges.map(
    (college) => college._id
  );

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["compare", collegeIds],
    queryFn: () => compareColleges(collegeIds),
    enabled: collegeIds.length >= 2,
  });

  const colleges = data?.data || [];
  const winners = getComparisonWinners(colleges);

  if (selectedColleges.length < 2) {
    return (
      <main className="compare-page">
        <div className="compare-container">
          <div className="compare-empty">
            <p className="eyebrow">COMPARE</p>

            <h1>Compare Colleges</h1>

            <p>
              Select at least two colleges to compare
              their fees, ratings, location and placements.
            </p>

            <button
              type="button"
              onClick={() => navigate("/colleges")}
            >
              Explore Colleges
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="compare-page">
        <div className="compare-container">
          <div className="compare-status">
            Loading comparison...
          </div>
        </div>
      </main>
    );
  }

  if (isError || colleges.length === 0) {
    return (
      <main className="compare-page">
        <div className="compare-container">
          <div className="compare-status">
            <h2>Unable to load comparison</h2>

            <p>
              Something went wrong while loading the
              selected colleges.
            </p>

            <button
              type="button"
              onClick={() => navigate("/colleges")}
            >
              Back to Colleges
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="compare-page">
      <div className="compare-container">

        <div className="compare-header">
          <div>
            <p className="eyebrow">COLLEGE COMPARISON</p>

            <h1>Compare Colleges</h1>

            <p>
              Compare the colleges side by side and make
              a more informed decision.
            </p>
          </div>

          <button
            type="button"
            className="clear-compare-page"
            onClick={clearCompare}
          >
            Clear All
          </button>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">

            <thead>
              <tr>
                <th>Criteria</th>

                {colleges.map((college) => (
                  <th key={college._id}>
                    <div className="comparison-college-header">
                      <strong>{college.name}</strong>

                      <span>
                        {college.location?.city},{" "}
                        {college.location?.state}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCompare(college._id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              <tr>
                <th>Location</th>

                {colleges.map((college) => (
                  <td key={college._id}>
                    {college.location?.city},{" "}
                    {college.location?.state}
                  </td>
                ))}
              </tr>

              <tr>
  <th>Fees</th>

  {colleges.map((college) => {
    const isWinner = winners.fees.includes(college._id);

    return (
      <td
        key={college._id}
        className={isWinner ? "comparison-winner" : ""}
      >
        <strong>
          ₹{college.fees?.toLocaleString("en-IN")}
        </strong>

        {isWinner && (
          <span className="winner-badge">
            Lowest
          </span>
        )}
      </td>
    );
  })}
</tr>

           <tr>
  <th>Rating</th>

  {colleges.map((college) => {
    const isWinner = winners.rating.includes(college._id);

    return (
      <td
        key={college._id}
        className={isWinner ? "comparison-winner" : ""}
      >
        <strong>
          ★ {college.rating}/5
        </strong>

        {isWinner && (
          <span className="winner-badge">
            Top Rated
          </span>
        )}
      </td>
    );
  })}
</tr>   

              <tr>
  <th>Average Package</th>

  {colleges.map((college) => {
    const packageValue =
      college.placements?.averagePackage || 0;

    const isWinner =
      winners.averagePackage.includes(college._id);

    return (
      <td
        key={college._id}
        className={isWinner ? "comparison-winner" : ""}
      >
        <strong>
          ₹{(packageValue / 100000).toFixed(1)} LPA
        </strong>

        {isWinner && (
          <span className="winner-badge">
            Highest
          </span>
        )}
      </td>
    );
  })}
</tr>

              <tr>
                <th>Highest Package</th>

                {colleges.map((college) => (
                  <td key={college._id}>
                    ₹{(
                      (college.placements?.highestPackage || 0) /
                      100000
                    ).toFixed(1)} LPA
                  </td>
                ))}
              </tr>

             <tr>
  <th>Placement Rate</th>

  {colleges.map((college) => {
    const placementRate =
      college.placements?.placementPercentage || 0;

    const isWinner =
      winners.placementPercentage.includes(
        college._id
      );

    return (
      <td
        key={college._id}
        className={isWinner ? "comparison-winner" : ""}
      >
        <strong>
          {placementRate}%
        </strong>

        {isWinner && (
          <span className="winner-badge">
            Best
          </span>
        )}
      </td>
    );
  })}
</tr>

              <tr>
                <th>Entrance Exams</th>

                {colleges.map((college) => (
                  <td key={college._id}>
                    {college.exams?.join(", ") || "N/A"}
                  </td>
                ))}
              </tr>

            </tbody>

          </table>
        </div>

      </div>
    </main>
  );
}

export default Compare;