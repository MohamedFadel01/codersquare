import { connectDb, syncDb } from "./src/models/dbConnection.js";
import initAssociations from "./src/models/modelsAssociations.js";

(async () => {
  await connectDb();
  initAssociations();
  await syncDb();
})();
