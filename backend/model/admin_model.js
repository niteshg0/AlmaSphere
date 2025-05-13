import mongoose from "mongoose";

const admin= new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    //   required: true,
    },
    role: {
      type: String,
    //   enum: ["Admin"],
      default: "Admin",
    },
},{ timestamps: true }
)

const Admin= mongoose.model("Admin", admin);
export default Admin;