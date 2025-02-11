import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["Alumni", "Admin", "Student"],
    default: "Alumni",
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  batch: {
    type: String,
    validate: {
      validator: function (value) {
        // Ensure batch follows "YYYY-YYYY" format
        const batchRegex = /^\d{4}-\d{4}$/;
        return !value || batchRegex.test(value); 
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
