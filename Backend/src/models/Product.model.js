import mongoose from "mongoose";

const productSchema = new mongoose.Schema({}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
/*
*product model** 
    - name : Sting,
    - image : String,
    - price : number,
    - desc : String, 
    - catagory : [
        String 
    ]
        [
            "mobiles", "chargers", "earphones", "cables", "assesories", "covers", "skins",
            [
                "recharges", "sim-port", "new sim card"
            ],
            [
                "parts", "mick", "speaker", "battery", "display", "folder", "case"
            ],
            [
                "Bluetooth", "headphones", "speakers","neckbends"
            ],
        ],
        timestamps;

        */
