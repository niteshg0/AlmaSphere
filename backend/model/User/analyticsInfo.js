import mongoose from "mongoose";

const analyticsInfo = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Donation: {
      type: Number,
    },
    QueryAnswered: {
      type: Number,
    },
    jobPosted: {
      type: Number,
    },
    EventOrganised: {
      type: Number,
    },
    postMade: {
      type: Number,
    },
  },
  { timestamps: true }
);

const AnalyticsInfo = mongoose.model("Analytics", analyticsInfo);

export default AnalyticsInfo;
