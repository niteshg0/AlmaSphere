import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  donations: [
    {
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Created", "Completed", "Failed"],
        default: "Pending",
      },
      currency: {
        type: String,
        default: "INR",
      },
      razorpay_order_id: String,
      razorpay_payment_id: String,
      donationType: {
        type: String,
        enum: ["One-Time", "Recurring"],
        required: true,
      },
      message: {
        type: String,
        maxlength: 500,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
    },
  ],
});

export const Donation= mongoose.model("Donation", donationSchema);
