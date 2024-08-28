import axios from "axios";

const api = axios.create({
  baseURL: "https://p01--shelfshare-be--4cxwyhlvb2mb.code.run/api",
});

export const postBook = (bookData) => {
  return api
    .post("/books", bookData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error posting book:", error);
      throw error;
    });
};

// api post book
