import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getColleges = async (params = {}) => {
  const response = await api.get("/colleges", {
    params,
  });

  return response.data;
};

export const getCollegeById = async (id) => {
  const response = await api.get(`/colleges/${id}`);

  return response.data;
};

export const compareColleges = async (collegeIds) => {
  const response = await api.get("/colleges/compare", {
    params: {
      ids: collegeIds.join(","),
    },
  });

  return response.data;
};

export const predictColleges = async (exam, rank) => {
  const response = await api.get("/colleges/predict", {
    params: {
      exam,
      rank,
    },
  });

  return response.data;
};