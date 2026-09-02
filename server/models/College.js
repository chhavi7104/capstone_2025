const mongoose = require("mongoose");

// A single course offered by a college (e.g. "B.Tech Computer Science")
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
    },
  },
  { _id: false } // sub-document doesn't need its own id for Phase 1
);

// Closing rank for a given entrance exam, used for admission-chance context
const cutoffSchema = new mongoose.Schema(
  {
    exam: {
      type: String,
      required: [true, "Exam name is required for cutoff entry"],
      trim: true,
    },
    closingRank: {
      type: Number,
      required: [true, "Closing rank is required for cutoff entry"],
      min: [0, "Closing rank cannot be negative"],
    },
  },
  { _id: false }
);

// A short student review left on a college's page
const reviewSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Review author is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Review rating is required"],
      min: [0, "Review rating cannot be below 0"],
      max: [5, "Review rating cannot be above 5"],
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
    },
  },
  { _id: false }
);

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "College name is required"],
      trim: true,
    },
    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
      },
    },
    fees: {
      type: Number,
      required: [true, "Fees are required"],
      min: [0, "Fees cannot be negative"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot be above 5"],
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    courses: {
      type: [courseSchema],
      validate: {
        validator: (courses) => Array.isArray(courses) && courses.length > 0,
        message: "At least one course is required",
      },
    },
    placements: {
      averagePackage: {
        type: Number,
        required: [true, "Average package is required"],
        min: [0, "Average package cannot be negative"],
      },
      highestPackage: {
        type: Number,
        required: [true, "Highest package is required"],
        min: [0, "Highest package cannot be negative"],
      },
      placementPercentage: {
        type: Number,
        required: [true, "Placement percentage is required"],
        min: [0, "Placement percentage cannot be below 0"],
        max: [100, "Placement percentage cannot exceed 100"],
      },
    },
    exams: {
      type: [String],
      default: [],
    },
    cutoff: {
      type: [cutoffSchema],
      default: [],
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
  }
);

/**
 * Indexes — chosen based on the actual query patterns from Phase 2
 * (search, filters, sort), not added blindly to every field.
 *
 * - name: supports sorting by name (?sortBy=name) and exact/prefix lookups.
 *   Note: the free-text `search` filter uses an unanchored, case-insensitive
 *   regex (`/term/i`), which cannot use a standard index for a substring
 *   match in the middle of a string — MongoDB still has to scan matching
 *   documents. This index still helps whenever `name` is sorted on, and
 *   would fully pay off if search is later upgraded to a `$text` index.
 * - location.state / location.city: single-field indexes, since state and
 *   city are frequently filtered independently (?state=, ?city=) and each
 *   also participates in the `search` $or.
 * - rating: supports both minRating range filtering and the default sort
 *   (rating desc), which is the field most listing requests will hit.
 * - fees: supports minFees/maxFees range filtering.
 * - exams: `exams` is an array field, so this becomes a multikey index —
 *   MongoDB indexes each array element individually, which is exactly what
 *   the ?exam= filter needs.
 *
 * Compound index trade-off: state + rating is a common combination
 * (?state=Delhi&minRating=4, and rating is also the default sort), so a
 * compound index on { "location.state": 1, rating: -1 } would serve that
 * specific combination more efficiently than two separate single-field
 * indexes. It's deliberately left out here — with 30-50 seed documents the
 * gain is negligible, and adding it prematurely would trade write
 * performance and storage for a query pattern that isn't confirmed as a
 * bottleneck yet. This is the kind of change to make later, backed by
 * real query stats (e.g. via `.explain()`) rather than guesswork.
 */
collegeSchema.index({ name: 1 });
collegeSchema.index({ "location.state": 1 });
collegeSchema.index({ "location.city": 1 });
collegeSchema.index({ rating: -1 });
collegeSchema.index({ fees: 1 });
collegeSchema.index({ exams: 1 });

module.exports = mongoose.model("College", collegeSchema);
