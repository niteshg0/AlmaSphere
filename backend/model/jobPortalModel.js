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
  requirements: {
    type: [String], // Array of required skills
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  application_deadline: {
    type: Date,
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
  job_type: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Contract"],
    required: true,
  },
  salary: {
    range: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Validate the format (e.g., "10000-20000")
          return /^\d+-\d+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid salary range format! Use format like "10000-20000".`,
      },
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "INR", "EUR", "GBP", "AUD", "CAD", "SGD"], // Add supported currencies
    },
  },
  contact_email: {
    type: String,
    required: true,
  },
  contact_phone: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active",
  },
  location: {
    type: String,
    required: true,
  },
  yearOfExperience: {
    type: String,
    enum: ["fresher", "1 year", "2 year", "3 year", "4 year", "5 year", "5+ year"],
    required: true,
  },
});

const JobPortal = mongoose.model("jobPortal", jobPortalSchema);

export default JobPortal;