export function getMatchLevel(userRank, closingRank) {
  if (!userRank || !closingRank) {
    return {
      label: "Estimated Match",
      type: "neutral",
    };
  }

  const rank = Number(userRank);
  const cutoff = Number(closingRank);

  if (rank <= cutoff * 0.5) {
    return {
      label: "Strong Match",
      type: "strong",
    };
  }

  if (rank <= cutoff * 0.8) {
    return {
      label: "Good Match",
      type: "good",
    };
  }

  return {
    label: "Borderline Match",
    type: "borderline",
  };
}