import mongoose from 'mongoose'
export const addressSchema  = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        // required: true
    },
    pincode: {
        type: Number,
        required: true
    },  
});
