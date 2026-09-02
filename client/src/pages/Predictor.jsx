import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { predictColleges } from "../services/collegeApi";
import CollegeCard from "../components/CollegeCard";
import { getMatchLevel } from "../utils/predictor";

function Predictor() {
  const [exam, setExam] = useState("JEE Advanced");
  const [rank, setRank] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["predictor", exam, rank],
    queryFn: () => predictColleges(exam, rank),
    enabled: submitted && Boolean(rank),
  });

  const recommendations = data?.data || [];

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedRank = Number(rank);

    if (!Number.isInteger(parsedRank) || parsedRank <= 0) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="predictor-page">
      <section className="predictor-hero">
        <div className="predictor-container">

          <div className="predictor-heading">
            <p className="eyebrow">
              COLLEGE PREDICTOR
            </p>

            <h1>
              Find colleges that match your rank
            </h1>

            <p>
              Enter your entrance exam and rank to discover
              colleges from our sample cutoff dataset.
            </p>
          </div>

          <form
            className="predictor-form"
            onSubmit={handleSubmit}
          >
            <div className="predictor-field">
              <label htmlFor="exam">
                Entrance Exam
              </label>

              <select
                id="exam"
                value={exam}
                onChange={(event) => {
                  setExam(event.target.value);
                  setSubmitted(false);
                }}
              >
                <option value="JEE Advanced">
                  JEE Advanced
                </option>

                <option value="JEE Main">
                  JEE Main
                </option>

                <option value="BITSAT">
                  BITSAT
                </option>
              </select>
            </div>

            <div className="predictor-field">
              <label htmlFor="rank">
                Your Rank
              </label>

              <input
                id="rank"
                type="number"
                min="1"
                step="1"
                value={rank}
                onChange={(event) => {
                  setRank(event.target.value);
                  setSubmitted(false);
                }}
                placeholder="e.g. 500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!rank}
              className="predictor-submit"
            >
              Find Colleges →
            </button>
          </form>

          <p className="predictor-disclaimer">
            Recommendations are based on the sample cutoff
            dataset and are intended for guidance only.
          </p>

        </div>
      </section>

      <section className="predictor-results">
        <div className="predictor-container">

          {!submitted && (
            <div className="predictor-empty">
              <h2>
                Enter your rank to get recommendations
              </h2>

              <p>
                We'll match your rank against the available
                college cutoff data.
              </p>
            </div>
          )}

          {submitted && isLoading && (
            <div className="predictor-status">
              <div className="predictor-spinner"></div>

              <p>
                Finding suitable colleges...
              </p>
            </div>
          )}

          {submitted && isError && (
            <div className="predictor-status error">
              <h2>
                Couldn't generate recommendations
              </h2>

              <p>
                Please try again in a moment.
              </p>
            </div>
          )}

          {submitted &&
            !isLoading &&
            !isError &&
            recommendations.length === 0 && (
              <div className="predictor-status">
                <h2>
                  No matching colleges found
                </h2>

                <p>
                  Try entering a better rank or selecting
                  another entrance exam.
                </p>
              </div>
            )}

          {submitted &&
            !isLoading &&
            !isError &&
            recommendations.length > 0 && (
              <>
                <div className="predictor-results-header">
                  <div>
                    <p className="eyebrow">
                      RECOMMENDATIONS
                    </p>

                    <h2>
                      Colleges for rank {Number(rank).toLocaleString("en-IN")}
                    </h2>
                  </div>

                  <span>
                    {recommendations.length} colleges found
                  </span>
                </div>

                <div className="predictor-grid">
                  {recommendations.map((college) => (
                    <div
                      className="predictor-result-card"
                      key={college._id}
                    >
                     <div
  className={`prediction-match ${
    getMatchLevel(
      rank,
      college.cutoffRank
    ).type
  }`}
>
  <div>
    <span>
      {
        getMatchLevel(
          rank,
          college.cutoffRank
        ).label
      }
    </span>

    <strong>
      Closing Rank:{" "}
      {college.cutoffRank?.toLocaleString("en-IN")}
    </strong>
  </div>

  <div className="rank-comparison">
    <span>Your Rank</span>

    <strong>
      {Number(rank).toLocaleString("en-IN")}
    </strong>
  </div>
</div>
<div className="prediction-summary">

  <div>
    <span>Rating</span>

    <strong>
      ★ {college.rating}
    </strong>
  </div>

  <div>
    <span>Fees</span>

    <strong>
      ₹{college.fees?.toLocaleString("en-IN")}
    </strong>
  </div>

  <div>
    <span>Placement</span>

    <strong>
      {college.placements?.placementPercentage || 0}%
    </strong>
  </div>

</div>

                      <CollegeCard college={college} />
                    </div>
                  ))}
                </div>
              </>
            )}

        </div>
      </section>
    </main>
  );
}

export default Predictor;