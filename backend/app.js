const express = require("express");
const { getAllBooks, createBook, getBookById } = require("./controllers/books");
const {
  createBookSwap,
  getAllSwapsByUserId,
  updateSwap,
} = require("./controllers/swaps");
const { getAllUsers } = require("./controllers/users");
const { getEndpoints } = require("./controllers");
const {
  getNotifications,
  markNotificationAsSeen,
} = require("./controllers/notifications");
const { getGenres } = require("./controllers/genres");
const { customErrorHandler, serverErrorHandler } = require("./error-handlers");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", getEndpoints);

app.get("/api/users", getAllUsers);

app.get("/api/books", getAllBooks);
app.post("/api/books", createBook);
app.get("/api/books/:bookId", getBookById);

app.post("/api/swaps", createBookSwap);
app.get("/api/swaps", getAllSwapsByUserId);
app.patch("/api/swaps/:swapId", updateSwap);

app.get("/api/notifications", getNotifications);
app.patch("/api/notifications/:id", markNotificationAsSeen);

app.get("/api/genres", getGenres);

app.all("*", (req, res, next) => {
  res.status(404).send({ message: "path not found" });
});

app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
