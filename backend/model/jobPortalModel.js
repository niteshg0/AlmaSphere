import mongoose from "mongoose";

const jobPortalSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobPortal = mongoose.model("jobPortal",jobPortalSchema)

export default JobPortal