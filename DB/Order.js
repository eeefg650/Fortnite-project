const mongoose = require("mongoose");

const String_REQ = {
  type: String,
};
const OrderSchema = mongoose.Schema({
  NameSkin: String_REQ,
  PriceSkin: Number,
  UserId: String_REQ,
  date: String
});

const Order = mongoose.model("OrderSkin", OrderSchema);
module.exports = Order;
