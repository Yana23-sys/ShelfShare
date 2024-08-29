import axios from "axios";

const api = axios.create({
  baseURL: "https://p01--shelfshare-be--4cxwyhlvb2mb.code.run/api",
});

export const getAllUsers = () => {
  return api
    .get(`/users`)
    .then((response) => {
      return response.data.users;
    })
    .catch((error) => {
      console.error("Error getting users from api:", error);
      throw error;
    });
};

export const getAllLocations = () => {
  return getAllUsers()
    .then((users) => {
      const locations = [...new Set(users.map((user) => user.location))]; // Get unique locations
      return locations;
    })
    .catch((error) => {
      console.error("Error getting locations:", error);
      throw error;
    });
};
