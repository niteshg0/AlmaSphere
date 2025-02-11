import mongoose from "mongoose";

const professionalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  years_of_experience: {
    type: Number,
    required: true,
  },
});
