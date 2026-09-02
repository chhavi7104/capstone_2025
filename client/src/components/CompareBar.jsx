import { useNavigate } from "react-router-dom";
import useCompare from "../context/useCompare";

function CompareBar() {
  const navigate = useNavigate();

  const {
    compareColleges,
    removeFromCompare,
    clearCompare,
  } = useCompare();

  if (compareColleges.length === 0) {
    return null;
  }

  const handleCompare = () => {
    navigate("/compare");
  };

  return (
    <div className="compare-bar">
      <div className="compare-bar-inner">
        <div className="compare-selected">
          <div className="compare-label">
            <strong>Compare Colleges</strong>
            <span>
              {compareColleges.length}/3 selected
            </span>
          </div>

          <div className="compare-colleges">
            {compareColleges.map((college) => (
              <div
                className="compare-mini-card"
                key={college._id}
              >
                <div>
                  <strong>{college.name}</strong>

                  <span>
                    {college.location?.city},{" "}
                    {college.location?.state}
                  </span>
                </div>

                <button
                  type="button"
                  aria-label={`Remove ${college.name}`}
                  onClick={() =>
                    removeFromCompare(college._id)
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="compare-bar-actions">
          <button
            type="button"
            className="clear-compare"
            onClick={clearCompare}
          >
            Clear
          </button>

          <button
            type="button"
            className="compare-now"
            disabled={compareColleges.length < 2}
            onClick={handleCompare}
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompareBar;