import mongoose from "mongoose"

export const connection = async ()=>{
    try {
        mongoose.connect(connectionString)
    } catch (error) {
        console.log("error while connection to DB ");
        process.exit(1);
    }
}