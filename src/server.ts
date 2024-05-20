import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.dburl as string);
    app.listen(config.port, () => {
      console.log(`server is listening port is ${config.port}`);
    });
  } catch (error) {
    console.log("mongodb failed to connection");
  }
}

main();
