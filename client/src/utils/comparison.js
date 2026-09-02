export function getComparisonWinners(colleges) {
  if (!colleges || colleges.length === 0) {
    return {
      rating: null,
      fees: null,
      averagePackage: null,
      placementPercentage: null,
    };
  }

  const highestRating = Math.max(
    ...colleges.map((college) => college.rating || 0)
  );

  const lowestFees = Math.min(
    ...colleges.map((college) => college.fees || Infinity)
  );

  const highestAveragePackage = Math.max(
    ...colleges.map(
      (college) => college.placements?.averagePackage || 0
    )
  );

  const highestPlacementPercentage = Math.max(
    ...colleges.map(
      (college) =>
        college.placements?.placementPercentage || 0
    )
  );

  return {
    rating: colleges
      .filter((college) => college.rating === highestRating)
      .map((college) => college._id),

    fees: colleges
      .filter((college) => college.fees === lowestFees)
      .map((college) => college._id),

    averagePackage: colleges
      .filter(
        (college) =>
          college.placements?.averagePackage ===
          highestAveragePackage
      )
      .map((college) => college._id),

    placementPercentage: colleges
      .filter(
        (college) =>
          college.placements?.placementPercentage ===
          highestPlacementPercentage
      )
      .map((college) => college._id),
  };
}