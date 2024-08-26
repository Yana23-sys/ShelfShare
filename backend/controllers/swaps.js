const { insertSwap, findAllSwapsByUserId } = require("../models/swaps");
const { findUserById } = require("../models/users");
const { findBookById } = require("../models/books");


exports.getAllSwapsByUserId = async (req, res, next) => {
  const { user_id } = req.query;

  const user = await findUserById(user_id);
  if (!user) {
    return res
      .status(404)
      .send({ message: `User with ID'${user_id}' does not exist` });
  }

  try {
    const swaps = await findAllSwapsByUserId(user_id);
    res.status(201).send({ swaps });
  } catch (error) {
    console.error("Error getting swaps by userId", error);
    next(error);
  }
};

exports.createSwap = async (req, res, next) => {
  const { sender, receiver, sender_book, receiver_book } = req.body;

  if (!sender || !receiver || !sender_book || !receiver_book) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields" });
  }

  const senderEntity = await findUserById(sender);
  const receiverEntity = await findUserById(receiver);
  if (!senderEntity || !receiverEntity) {
    return res
      .status(404)
      .send({ message: `Non existent userId provided` });
  }

  const senderBookEntity = await findBookById(sender_book);
  const receiverBookEntity = await findBookById(receiver_book);
  if (!senderBookEntity || !receiverBookEntity) {
    return res
      .status(404)
      .send({ message: `Non existent bookId provided` });
  }

  try {
    const insertedSwap = await insertSwap(req.body);
    res.status(201).send({ swap: insertedSwap });
  } catch (error) {
    console.error("Error inserting swap:", error);
    next(error);
  }
};
