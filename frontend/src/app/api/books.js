import axios from "axios";

const api = axios.create({
  baseURL: "https://p01--shelfshare-be--4cxwyhlvb2mb.code.run/api",
});

export const getAllBooks = (params) => {
  return api
    .get(`/books`, { params })
    .then((response) => {
      return response.data; // return the entire response including pagination info
    })
    .catch((error) => {
      console.error("Error getting books from api:", error);
      throw error;
    });
};

export const getBookById = (id) => {
  return api
    .get(`/books/${id}`)
    .then((response) => {
      return response.data.book;
    })
    .catch((error) => {
      console.error("Error getting book by id from api:", error);
      throw error;
    });
};

export const getAllBooksByUserId = (userId) => {
  return api
    .get(`/books?user_id=${userId}`)
    .then((response) => {
      return response.data.books;
    })
    .catch((error) => {
      console.error("Error getting books from api:", error);
      throw error;
    });
};

export const fetchSortedBooks = ({ sort_by, location }) => {
  const params = {};

  if (sort_by) params.sort_by = sort_by;
  if (location) params.location = location;

  return api
    .get("/books", { params })
    .then((response) => {
      return response.data.books;
    })
    .catch((error) => {
      console.error("Error fetching sorted books:", error);
      throw error;
    });
};
