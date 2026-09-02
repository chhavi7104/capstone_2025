import { useNavigate } from "react-router-dom";
import useCompare from "../context/useCompare";

function CollegeCard({ college }) {
  const navigate = useNavigate();
  const { addToCompare, removeFromCompare, isInCompare ,canAddMore} = useCompare();
  const selected = isInCompare(college._id);
  const averagePackage =
    college.placements?.averagePackage || 0;

  return (
    <article className="college-card">
      <div className="college-card-top">
        <div>
          <h3>{college.name}</h3>

          <p>
            {college.location?.city},{" "}
            {college.location?.state}
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
            ₹{college.fees?.toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <span>Avg. Package</span>
          <strong>
            ₹{(averagePackage / 100000).toFixed(1)} LPA
          </strong>
        </div>
      </div>
      <div className="college-card-actions">
<button
  type="button"
  className="compare-button"
  disabled={!selected && !canAddMore}
  onClick={() => {
    if (selected) {
      removeFromCompare(college._id);
    } else {
      addToCompare(college);
    }
  }}
>
  {selected ? "✓ Added to Compare" : "Add to Compare"}
</button>
      <button
        className="secondary-button"
        onClick={() => navigate(`/colleges/${college._id}`)}
      >
        View Details
      </button>
      </div>
    </article>
  );
}

export default CollegeCard;