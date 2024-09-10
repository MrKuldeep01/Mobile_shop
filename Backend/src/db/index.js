import mongoose from "mongoose"
import envConfig from "../../Config/envConfig.js";
import constants from "../constants.js";

const connection = async ()=>{
    try {
      const connect = await mongoose.connect(`${envConfig.dataBaseUri}/${constants.dataBaseName}`);
      console.log(connect.connection.name , " :: DB is connected.");
    } catch (error) {
        console.log("Error while connection to DB :: db :: ",error.message);
        process.exit(1);
    }
}   

export default connection;