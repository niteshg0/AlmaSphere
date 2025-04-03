import mongoose from "mongoose";

const extraInfo = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    achievements: {
      type: [
        {
          title: {
            type: String,
          },
          description: {
            type: String,
          },
          date: {
            type: Date,
          },
        },
      ],
      default: [],
    },
    extracurriculars: {
      type: [
        {
          activity: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
          duration: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const ExtraInfo = mongoose.model("Extra", extraInfo);

export default ExtraInfo;
