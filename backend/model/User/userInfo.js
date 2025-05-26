import mongoose, { Mongoose } from "mongoose";

const userInfo = new mongoose.Schema(
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
    role: {
      type: String,
      enum: ["Alumni", "Admin", "Student"],
      default: "Student",
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
    password: {
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
    mediaUrl: [
      {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    extraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Extra",
    },
    analyticsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analytics",
    },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userInfo);

export default User;
