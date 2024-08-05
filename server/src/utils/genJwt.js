import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const genJwt = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default genJwt;
