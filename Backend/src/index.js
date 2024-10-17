import constants from "./constants.js";
import connection from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

connection()
  .then(() => {
    console.log("connection established.");
    app.on("error", (error) => {
      // process.exit(1);
      console.log(
        "Error occured with server connection in app :: index.js :: ",
        error
      );
    });
    const port = 3000 || process.env.PORT;
    app.listen(port, () => {
      console.log(
        "app is live on: ",
        "http://localhost:" + port+ constants.baseUrl
      );
    });
  })
  .catch((err) => {
    console.log("connection is faild due to following Error: \n ", err);
  });
