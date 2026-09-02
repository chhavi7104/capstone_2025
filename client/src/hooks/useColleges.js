import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getColleges } from "../services/collegeApi";

function useColleges(params = {}) {
  return useQuery({
    queryKey: ["colleges", params],
    queryFn: () => getColleges(params),
    placeholderData: keepPreviousData,
  });
}

export default useColleges;