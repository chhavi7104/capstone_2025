import { createContext, useMemo, useState } from "react";

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareColleges, setCompareColleges] = useState([]);

  const addToCompare = (college) => {
    setCompareColleges((current) => {
      if (current.some((item) => item._id === college._id)) {
        return current;
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, college];
    });
  };

  const removeFromCompare = (collegeId) => {
    setCompareColleges((current) =>
      current.filter((college) => college._id !== collegeId)
    );
  };

  const clearCompare = () => {
    setCompareColleges([]);
  };

  const value = useMemo(
    () => ({
      compareColleges,
      addToCompare,
      removeFromCompare,
      clearCompare,
      canAddMore: compareColleges.length < 3,
    }),
    [compareColleges]
  );

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}

export default CompareContext;