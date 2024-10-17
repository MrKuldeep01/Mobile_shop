import mongoose from "mongoose";
import envConfig from "../../Config/envConfig.js";
import constants from "../constants.js";

const connection = async () => {
  try {
    const connect = await mongoose.connect(
      `${envConfig.dataBaseUri}/${constants.dataBaseName}`
    );
    console.log("connecting to database...");
    console.log("database found as:",connect.connection.name);
  } catch (error) {
    console.log("Error occured in Database connection. Read following description for more details:\n", error.message);
    process.exit(1);
  }
};

export default connection;
