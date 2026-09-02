/**
 * Query helpers for GET /api/colleges.
 *
 * These functions turn raw, untrusted req.query values into safe MongoDB
 * query pieces (filter / sort / pagination), or return a { error } object
 * describing what was wrong. The controller checks for `.error` and
 * returns a 400 immediately — none of this ever throws.
 *
 * Keeping this logic out of the controller keeps getColleges() readable,
 * and keeping it out of the model keeps the schema focused on data shape.
 */

// Only these fields can be sorted on. This is a whitelist, not a blocklist,
// because a blocklist would still let a user pass an arbitrary field name
// (or a nested path they shouldn't be able to sort by) that just happens
// not to be on the blocked list.
const ALLOWED_SORT_FIELDS = ["rating", "fees", "name", "placements.averagePackage"];
const ALLOWED_SORT_ORDERS = ["asc", "desc"];

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

/**
 * Escapes regex special characters so user input can be safely embedded in a
 * `new RegExp()` call. Without this, a search term like "a+" or "(" would
 * either throw or change the meaning of the pattern (regex injection).
 */
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Validates and parses `page` and `limit` from query params.
 * Returns { page, limit } or { error }.
 */
const parsePagination = (query) => {
  let page = DEFAULT_PAGE;
  let limit = DEFAULT_LIMIT;

  if (query.page !== undefined) {
    page = Number(query.page);
    if (!Number.isInteger(page) || page < 1) {
      return { error: "page must be a positive integer" };
    }
  }

  if (query.limit !== undefined) {
    limit = Number(query.limit);
    if (!Number.isInteger(limit) || limit < 1) {
      return { error: "limit must be a positive integer" };
    }
    if (limit > MAX_LIMIT) {
      return { error: `limit cannot exceed ${MAX_LIMIT}` };
    }
  }

  return { page, limit };
};

/**
 * Validates and builds a Mongoose sort object from `sortBy` / `order`.
 * Returns { sort } or { error }.
 */
const buildSort = (query) => {
  const sortBy = query.sortBy || "rating";
  const order = query.order || "desc";

  if (!ALLOWED_SORT_FIELDS.includes(sortBy)) {
    return { error: `sortBy must be one of: ${ALLOWED_SORT_FIELDS.join(", ")}` };
  }
  if (!ALLOWED_SORT_ORDERS.includes(order)) {
    return { error: 'order must be "asc" or "desc"' };
  }

  return { sort: { [sortBy]: order === "asc" ? 1 : -1 } };
};

/**
 * Validates and builds a MongoDB filter object from search + filter query
 * params. Every condition is pushed into a `$and` array so search and
 * filters can be combined freely without overwriting each other.
 * Returns { filter } or { error }.
 */
const buildFilter = (query) => {
  const conditions = [];

  // Free-text search across name, city, and state. Case-insensitive,
  // substring match (not anchored), so it behaves like "contains".
  if (query.search) {
    const term = query.search.trim();
    if (term) {
      const regex = new RegExp(escapeRegex(term), "i");
      conditions.push({ $or: [{ name: regex }, { "location.city": regex }, { "location.state": regex }] });
    }
  }

  // Exact (case-insensitive) match filters
  if (query.state) {
    conditions.push({ "location.state": new RegExp(`^${escapeRegex(query.state.trim())}$`, "i") });
  }
  if (query.city) {
    conditions.push({ "location.city": new RegExp(`^${escapeRegex(query.city.trim())}$`, "i") });
  }
  if (query.exam) {
    // `exams` is an array field; Mongo automatically matches if any
    // element equals the regex, no $elemMatch needed for a single condition.
    conditions.push({ exams: new RegExp(`^${escapeRegex(query.exam.trim())}$`, "i") });
  }

  // Numeric range filters
  if (query.minRating !== undefined) {
    const value = Number(query.minRating);
    if (Number.isNaN(value)) return { error: "minRating must be a number" };
    if (value < 0 || value > 5) return { error: "minRating must be between 0 and 5" };
    conditions.push({ rating: { $gte: value } });
  }

  if (query.minFees !== undefined) {
    const value = Number(query.minFees);
    if (Number.isNaN(value)) return { error: "minFees must be a number" };
    if (value < 0) return { error: "minFees cannot be negative" };
    conditions.push({ fees: { $gte: value } });
  }

  if (query.maxFees !== undefined) {
    const value = Number(query.maxFees);
    if (Number.isNaN(value)) return { error: "maxFees must be a number" };
    if (value < 0) return { error: "maxFees cannot be negative" };
    conditions.push({ fees: { $lte: value } });
  }

  if (
    query.minFees !== undefined &&
    query.maxFees !== undefined &&
    Number(query.minFees) > Number(query.maxFees)
  ) {
    return { error: "minFees cannot be greater than maxFees" };
  }

  return { filter: conditions.length > 0 ? { $and: conditions } : {} };
};

module.exports = {
  ALLOWED_SORT_FIELDS,
  ALLOWED_SORT_ORDERS,
  MAX_LIMIT,
  escapeRegex,
  parsePagination,
  buildSort,
  buildFilter,
};
