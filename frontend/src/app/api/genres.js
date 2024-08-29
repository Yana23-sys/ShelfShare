import axios from "axios";

const api = axios.create({
  baseURL: "https://p01--shelfshare-be--4cxwyhlvb2mb.code.run/api",
});
export const getAllGenres = () => {
  return api
    .get(`/genres`)
    .then((response) => {
      return response.data.genres;
    })
    .catch((error) => {
      console.error("Error getting genres from api:", error);
      throw error;
    });
};
