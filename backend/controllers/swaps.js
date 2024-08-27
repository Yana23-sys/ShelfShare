const {insertSwap} = require("../models/swaps")
const {findUserById} = require("../models/users")
const {findBookById} = require("../models/books")
const mongoose = require("mongoose");

 exports.createBookSwap = async (req, res, next) => {
    const { sender, receiver, sender_book, receiver_book } = req.body;
    if (!sender || !receiver || !sender_book || !receiver_book) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(sender_book)) {
        return res.status(400).send({ message: "Invalid ID format" });
    }

    const senderEntity = await findUserById(sender);
    const receiverEntity = await findUserById(receiver);
    if (!senderEntity || !receiverEntity) {
      return res.status(404).send({ message: "Non existent userId provided" });
    }
    const senderBookEntity = await findBookById(sender_book);
    const receiverBookEntity = await findBookById(receiver_book);
    if (!senderBookEntity || !receiverBookEntity) {
      return res.status(404).send({ message: "Non existent bookId provided" });
    }
    try {
      const insertedSwap = await insertSwap(req.body);
      console.log(insertedSwap)
      res.status(201).send({ swap: insertedSwap });
    } catch (error) {
      console.error("Error inserting swap:", error);
      next(error);
    }
  };
