const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const swapSchema = new mongoose.Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sender_book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  receiver_book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  date_created: { type: Date, default: Date.now },
  date_updated: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
});

const Swap = mongoose.model("Swap", swapSchema);

const insertSwap = async (swap) => {
  const newSwap = {
    sender: ObjectId.createFromHexString(swap.sender),
    receiver: ObjectId.createFromHexString(swap.receiver),
    sender_book: ObjectId.createFromHexString(swap.sender_book),
    receiver_book: ObjectId.createFromHexString(swap.receiver_book),
  };
  return await new Swap(newSwap).save();
};

module.exports = {Swap, insertSwap};