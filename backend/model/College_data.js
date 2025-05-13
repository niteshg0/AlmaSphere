import mongoose from "mongoose";

const college_data = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    course: {
      type: String,
      // required: true,
    },
    branch: {
      type: String,
      // required: true,
    },
    cgpa: {
      type: Number,
    },
    batch: {
      type: String,
      required: true,
    },
    verifyCode: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    codeExpiry: {
      type: Date,
    },
  },{timestamps: true}
);

const College_data = mongoose.model("College_data", college_data);

export default College_data;
