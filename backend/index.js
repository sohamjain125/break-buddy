import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./src/routes/Auth.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(console.log("MOngoDb connected"))
  .catch((error) => {
    error;
  });

const PORT = process.env.PORT;

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
