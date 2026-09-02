import { useQuery } from "@tanstack/react-query";
import { getCollegeById } from "../services/collegeApi";

function useCollege(id) {
  return useQuery({
    queryKey: ["college", id],
    queryFn: () => getCollegeById(id),
    enabled: Boolean(id),
  });
}

export default useCollege;