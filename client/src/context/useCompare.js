import { useContext } from "react";
import CompareContext from "./CompareContext";

function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  const {
    compareColleges,
    addToCompare,
    removeFromCompare,
    clearCompare,
    canAddMore,
  } = context;

  const isInCompare = (collegeId) => {
    return compareColleges.some(
      (college) => college._id === collegeId
    );
  };

  return {
    compareColleges,
    addToCompare,
    removeFromCompare,
    clearCompare,
    canAddMore,
    isInCompare,
  };
}

export default useCompare;