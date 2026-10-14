import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/store")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});