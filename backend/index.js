import express from "express";
import router from "./routes/userRoute.js";
// import academicRouter from "./routes/academicRout.js";
import jobPortalRouter from "./routes/jobPortalRout.js";
import queryRouter from "./routes/queryRoute.js";
import adminRouter from "./routes/adminRoute.js";
import contactRouter from "./routes/contactRoute.js"
import searchRouter from "./routes/searchRout.js"
import connectUserRouter from "./routes/connectUserRout.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay";
import cors from "cors";

// db connection
import connectDB from "./utils/DbConnection.js";
import donationRouter from "./routes/doantionRoute.js";

dotenv.config();
connectDB();
const PORT = process.env.VITE_BACKEND_PORT || 8001;

const app = express();

// Configure CORS with specific options
app.use(
  cors({
    origin: [
      process.env.VITE_FRONTEND_URL,
      `http://localhost:${process.env.VITE_PORT}`,
    ], // Allow your frontend domain
    credentials: true, // Allow cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

export const instance = new Razorpay({
  key_id: process.env.VITE_RAZOR_PAY_API_ID,
  key_secret: process.env.RAZOR_PAY_API_SECRET,
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", router);
// app.use("/api/academics", academicRouter);
app.use("/api/jobDetail", jobPortalRouter);
app.use("/api/donation", donationRouter);
app.use("/api/query", queryRouter);
app.use("/api/admin", adminRouter)
app.use("/api/search",searchRouter)
app.use("/api/contactus", contactRouter)
app.use("/api/connectUser",connectUserRouter)

app.use("/", (req, res) => {
  return res.status(200).json("Welcome to Backend");
});

app.listen(PORT, () => console.log(`server started at PORT : ${PORT}...`));
