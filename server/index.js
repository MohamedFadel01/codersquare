import app from "./app.js";
import dotenv from "dotenv";
import log from "fancy-log";
import { connectDb, syncDb } from "./src/models/dbConnection.js";
import initAssociations from "./src/models/modelsAssociations.js";

dotenv.config();

(async () => {
  await connectDb();
  await syncDb();
  initAssociations();
  app.listen(process.env.PORT, () =>
    log(`Server started on port ${process.env.PORT}`)
  );
})();
