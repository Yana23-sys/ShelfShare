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
    enum: ["pending", "accepted", "rejected", "completed", "canceled"],
    default: "pending",
  },
});

const Swap = mongoose.model("Swap", swapSchema);


// Middleware to update date_updated on findOneAndUpdate
swapSchema.pre('findOneAndUpdate', function(next) {
  this.set({ date_updated: Date.now() });
  next();
});

// Middleware to update date_updated on updateOne
swapSchema.pre('updateOne', function(next) {
  this.set({ date_updated: Date.now() });
  next();
});


const insertSwap = async (swap) => {
  const newSwap = {
    sender: ObjectId.createFromHexString(swap.sender),
    receiver: ObjectId.createFromHexString(swap.receiver),
    sender_book: ObjectId.createFromHexString(swap.sender_book),
    receiver_book: ObjectId.createFromHexString(swap.receiver_book),
  };

  return await new Swap(newSwap).save();
};

const findAllSwapsByUserId = async (userId) => {
  return await Swap.find({
    $or: [
      { sender: ObjectId.createFromHexString(userId) },
      { receiver: ObjectId.createFromHexString(userId) },
    ],
  })
    .sort({ date_updated: -1 })
    .populate("sender")
    .populate("receiver")
    .populate("sender_book")
    .populate("receiver_book");
};

const updateSwapStatus = async (swapId, status) => {
  return await Swap
  .findOneAndUpdate({ _id: ObjectId.createFromHexString(swapId) }, { status })
  .populate("sender")
  .populate("receiver")
  .populate("sender_book")
  .populate("receiver_book");
};

module.exports = { insertSwap, findAllSwapsByUserId, updateSwapStatus };
