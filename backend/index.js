import express from "express";
import router from "./routes/userRoute.js";
import academicRouter from "./routes/academicRout.js";
import jobPortalRouter from "./routes/jobPortalRout.js";
import queryRouter from "./routes/queryRoute.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay";

// db connection
import connectDB from "./utils/DbConnection.js";
import donationRouter from "./routes/doantionRoute.js";

dotenv.config();
connectDB();
const PORT = process.env.VITE_BACKEND_PORT || 8000;

const app = express();

export const instance = new Razorpay({
  key_id: process.env.VITE_RAZOR_PAY_API_ID,
  key_secret: process.env.RAZOR_PAY_API_SECRET,
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", router);
app.use("/api/academics", academicRouter);
app.use("/api/jobDetail", jobPortalRouter);
app.use("/api/donation", donationRouter);
app.use("/api/query", queryRouter);

app.listen(PORT, () => console.log(`server started at PORT : ${PORT}...`));
