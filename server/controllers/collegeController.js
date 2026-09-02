const mongoose = require("mongoose");
const College = require("../models/College");
const { parsePagination, buildSort, buildFilter } = require("../utils/queryHelpers");

/**
 * GET /api/colleges
 * Phase 2: supports search (?search=), filters (?state=, ?city=, ?minRating=,
 * ?maxFees=, ?minFees=, ?exam=), sorting (?sortBy=, ?order=), and pagination
 * (?page=, ?limit=) — all applied by MongoDB, not in application code.
 *
 * Each query-param group is validated by a helper in utils/queryHelpers.js.
 * If any helper reports an `error`, we return a 400 immediately instead of
 * running a query with bad input.
 */
const getColleges = async (req, res, next) => {
  try {
    const paginationResult = parsePagination(req.query);
    if (paginationResult.error) {
      return res.status(400).json({ success: false, message: paginationResult.error });
    }
    const { page, limit } = paginationResult;

    const sortResult = buildSort(req.query);
    if (sortResult.error) {
      return res.status(400).json({ success: false, message: sortResult.error });
    }
    const { sort } = sortResult;

    const filterResult = buildFilter(req.query);
    if (filterResult.error) {
      return res.status(400).json({ success: false, message: filterResult.error });
    }
    const { filter } = filterResult;

    const skip = (page - 1) * limit;

    // Run the page query and the total count in parallel — both need the
    // same filter, but count doesn't need sort/skip/limit applied.
    const [colleges, total] = await Promise.all([
      College.find(filter).sort(sort).skip(skip).limit(limit),
      College.countDocuments(filter),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error); // hand off to centralized error middleware
  }
};

/**
 * GET /api/colleges/:id
 * Returns a single college by its MongoDB ObjectId.
 */
const getCollegeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Guard against malformed ids before hitting the database, so an
    // invalid id returns a clean 400 instead of a raw Mongoose CastError.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college id",
      });
    }

    const college = await College.findById(id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error) {
    next(error);
  }
};

const compareColleges = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "College IDs are required",
      });
    }

    const collegeIds = ids
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (collegeIds.length < 2 || collegeIds.length > 3) {
      return res.status(400).json({
        success: false,
        message: "Compare between 2 and 3 colleges",
      });
    }

    const colleges = await College.find({
      _id: { $in: collegeIds },
    }).lean();

    if (colleges.length !== collegeIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more colleges were not found",
      });
    }

    const orderedColleges = collegeIds.map((id) =>
      colleges.find(
        (college) => college._id.toString() === id
      )
    );

    return res.status(200).json({
      success: true,
      data: orderedColleges,
    });
  } catch (error) {
    console.error("Compare colleges error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to compare colleges",
    });
  }
};
const predictColleges = async (req, res) => {
  try {
    const { exam, rank } = req.query;

    if (!exam || rank === undefined) {
      return res.status(400).json({
        success: false,
        message: "Exam and rank are required",
      });
    }

    const parsedRank = Number(rank);

    if (!Number.isInteger(parsedRank) || parsedRank <= 0) {
      return res.status(400).json({
        success: false,
        message: "Rank must be a positive integer",
      });
    }

    const normalizedExam = exam.trim();

    if (!normalizedExam) {
      return res.status(400).json({
        success: false,
        message: "Exam cannot be empty",
      });
    }

    const colleges = await College.find({
      exams: {
        $regex: new RegExp(`^${normalizedExam}$`, "i"),
      },
    }).lean();

    const recommendations = colleges
      .map((college) => {
        const cutoff = college.cutoff?.find(
          (item) =>
            item.exam.toLowerCase() ===
            normalizedExam.toLowerCase()
        );

        if (!cutoff) {
          return null;
        }

        if (parsedRank > cutoff.closingRank) {
          return null;
        }

        return {
          ...college,
          cutoffRank: cutoff.closingRank,
          rankMargin: cutoff.closingRank - parsedRank,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.cutoffRank !== b.cutoffRank) {
          return a.cutoffRank - b.cutoffRank;
        }

        return b.rating - a.rating;
      });

    return res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
      meta: {
        exam: normalizedExam,
        rank: parsedRank,
      },
    });
  } catch (error) {
    console.error("Predictor error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate college predictions",
    });
  }
};

module.exports = {
  getColleges,
  getCollegeById,
  compareColleges,
  predictColleges,
};
