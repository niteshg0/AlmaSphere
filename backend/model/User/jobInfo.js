import mongoose from "mongoose";

const jobInfo = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  duration: {
    type: String
  },
  location: {
    type: String
  },
  previousCompany :[{
    companyName: {
        type: String,
        required: true,
      },
      position: {
        type: String
      },
      duration: {
        type: String
      },
  }]
}, {timestamps: true});

const JobInfo= mongoose.model("Job", jobInfo);

export default JobInfo;
