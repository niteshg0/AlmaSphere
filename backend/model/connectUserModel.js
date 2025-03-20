import mongoose, { Schema } from "mongoose";

const connectUserSchema = mongoose.Schema(
  { 
    

    senderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accept", "reject"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const connectUser = mongoose.model("connectUser",connectUserSchema)

export default connectUser;