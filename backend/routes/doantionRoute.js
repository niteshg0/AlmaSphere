import { Router } from "express";
import {
  create_donation,
  verify_donation,
  verifyPayment,
} from "../controller/donationControlller.js";
import authentication from "../middleware/authentication.js";

const donationRouter = Router();

// Create donation (requires authentication)
donationRouter.post("/", authentication, create_donation);

// Webhook route for Razorpay to call
donationRouter.post("/verify", verify_donation);

// API route for frontend to verify payment
// donationRouter.post("/verify-payment", verifyPayment);

export default donationRouter;
