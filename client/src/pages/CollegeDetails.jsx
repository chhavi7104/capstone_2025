import { useNavigate, useParams } from "react-router-dom";

import useCollege from "../hooks/useCollege";

function CollegeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useCollege(id);

  if (isLoading) {
    return (
      <main className="details-page">
        <div className="details-container">
          <div className="details-skeleton">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text short"></div>

            <div className="skeleton-grid">
              <div className="skeleton skeleton-box"></div>
              <div className="skeleton skeleton-box"></div>
              <div className="skeleton skeleton-box"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="details-page">
        <div className="details-container">
          <div className="details-status error">
            <h2>College not found</h2>

            <p>
              We couldn't load the college details.
            </p>

            <div className="details-actions">
              <button
                type="button"
                onClick={() => refetch()}
              >
                Try Again
              </button>

              <button
                type="button"
                className="secondary-action"
                onClick={() => navigate("/colleges")}
              >
                Back to Colleges
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const college = data.data;

  const location = college.location || {};
  const placements = college.placements || {};
  const courses = college.courses || [];
  const reviews = college.reviews || [];

  return (
    <main className="details-page">

      {/* Back */}
      <div className="details-container">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/colleges")}
        >
          ← Back to Colleges
        </button>
      </div>

      {/* Header */}
      <section className="college-detail-header">
        <div className="details-container">

          <div className="college-detail-heading">

            <div>
              <p className="eyebrow">
                COLLEGE PROFILE
              </p>

              <h1>{college.name}</h1>

              <p className="college-location">
                📍 {location.city}, {location.state}
              </p>
            </div>

            <div className="detail-rating">
              <span>★</span>
              {college.rating}
              <small>/ 5</small>
            </div>

          </div>

          <div className="detail-summary">

            <div>
              <span>Annual Fees</span>
              <strong>
                ₹{college.fees?.toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>Average Package</span>
              <strong>
                ₹{(
                  (placements.averagePackage || 0) / 100000
                ).toFixed(1)} LPA
              </strong>
            </div>

            <div>
              <span>Placement Rate</span>
              <strong>
                {placements.placementPercentage || 0}%
              </strong>
            </div>

            <div>
              <span>Highest Package</span>
              <strong>
                ₹{(
                  (placements.highestPackage || 0) / 100000
                ).toFixed(1)} LPA
              </strong>
            </div>

          </div>

        </div>
      </section>

      {/* Overview */}
      <section className="details-section">
        <div className="details-container">

          <div className="details-section-heading">
            <p className="eyebrow">ABOUT</p>
            <h2>Overview</h2>
          </div>

          <div className="overview-card">
            <p>
              {college.overview ||
                "No overview is available for this college."}
            </p>
          </div>

        </div>
      </section>

      {/* Courses */}
      <section className="details-section alternate-section">
        <div className="details-container">

          <div className="details-section-heading">
            <p className="eyebrow">ACADEMICS</p>
            <h2>Courses</h2>
          </div>

          {courses.length > 0 ? (
            <div className="courses-grid">
              {courses.map((course, index) => (
                <div
                  className="course-card"
                  key={`${course.name}-${index}`}
                >
                  <div className="course-icon">
                    🎓
                  </div>

                  <div>
                    <h3>{course.name}</h3>

                    <p>
                      Duration: {course.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="details-status">
              <p>
                Course information is currently unavailable.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Placements */}
      <section className="details-section">
        <div className="details-container">

          <div className="details-section-heading">
            <p className="eyebrow">CAREER OUTCOMES</p>
            <h2>Placements</h2>
          </div>

          <div className="placement-grid">

            <div className="placement-card">
              <span>Average Package</span>

              <strong>
                ₹{(
                  (placements.averagePackage || 0) / 100000
                ).toFixed(1)} LPA
              </strong>
            </div>

            <div className="placement-card">
              <span>Highest Package</span>

              <strong>
                ₹{(
                  (placements.highestPackage || 0) / 100000
                ).toFixed(1)} LPA
              </strong>
            </div>

            <div className="placement-card">
              <span>Placement Rate</span>

              <strong>
                {placements.placementPercentage || 0}%
              </strong>
            </div>

          </div>

        </div>
      </section>

      {/* Reviews */}
      <section className="details-section alternate-section">
        <div className="details-container">

          <div className="details-section-heading">
            <p className="eyebrow">STUDENT FEEDBACK</p>
            <h2>Reviews</h2>
          </div>

          {reviews.length > 0 ? (
            <div className="reviews-list">

              {reviews.map((review, index) => (
                <article
                  className="review-card"
                  key={`${review.author}-${index}`}
                >
                  <div className="review-header">

                    <div>
                      <h3>{review.author}</h3>

                      <div className="review-rating">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>

                    <span>
                      {review.rating}/5
                    </span>

                  </div>

                  <p>{review.comment}</p>
                </article>
              ))}

            </div>
          ) : (
            <div className="details-status">
              <p>
                No reviews are available yet.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default CollegeDetails;