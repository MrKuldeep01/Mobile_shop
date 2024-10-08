import mongoose from "mongoose";
/*
user_id
address_line
city
state
postal_code
country
*/
const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
  localAddress: {
    type: String,
    required: true,
    minlength: [3, "Please enter proper local address!"],
  },
  city: {
    type: String,
    required: true,
  },
  postCode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "India",
    required: true,
  },
});

export const Address = mongoose.model("Address", addressSchema)