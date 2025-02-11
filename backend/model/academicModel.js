import mongoose from "mongoose";

const academicSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year_of_graduation: {
    type: Number,
    required: true,
  },
  achievements: [
    {
      title: {
        type: String, // Achievement title
      },
      description: {
        type: String, // Details of the achievement
      },
      date: {
        type: Date, // When the achievement occurred
      },
    },
  ],
  extracurriculars: [
    {
      activity: {
        type: String,
        required: true, // If provided, activity name is mandatory
      },
      description: {
        type: String, // Details about the activity
      },
      duration: {
        type: String, // E.g., "2 years" or "2019 - 2021"
      },
    },
  ],
  cgpa: {
    type: Number,
    min: 0,
    max: 10.0,
  },
});

const Academic = mongoose.model("academic", academicSchema);

export default Academic;

