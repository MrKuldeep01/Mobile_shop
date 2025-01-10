import constants from "./constants.js";
import connection from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

connection()
  .then(() => {
    console.log("Let's start...");
    app.on("error", (error) => {
      console.log(
        "Error occured with server connection in app :: index.js :: ",
        error
      );
    });
    const port = 3000 || process.env.PORT;
    
    app.listen(port, () => {
      console.log(
        "app is live "
      );
    });
  })
  .catch((err) => {
    console.log("connection is faild due to following Error: \n ", err);
  });
