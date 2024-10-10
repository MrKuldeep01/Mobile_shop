import mongoose from "mongoose"


/*
user_id
product_id
quantity
added_date
*/
const cartSchema = new mongoose.Schema({
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
},
productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
},
quantity:{
    type: Number,
    required: true,
    default: 1,
},
addedDate: {
    type: Date,
    default: Date.now()
}
}) 

export const Cart = mongoose.model("Cart",cartSchema)