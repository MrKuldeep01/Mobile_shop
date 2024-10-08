/*
order_id
payment_status (paid/pending)
payment_method (credit card, PayPal, etc.)
transaction_id
payment_date
*/
import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
orderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Order'
},
paymentStatus:{
    type: String,
    enum:["paid","pending"]
},
paymentMethod:{
    type: String,
},
transactionId:{
    type: String
},
paymentDate: {
    type: Date,
    default: Date.now()
}
})
export const Payment = mongoose.model("Payment",paymentSchema);
// I DON'T HAVE ENOUGH KNOWLEDGE ABOUT PAYMENTS, HENCE AM NOT USING THIS RIGHT NOW ...