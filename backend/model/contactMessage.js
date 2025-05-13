import mongoose from "mongoose";


const contactMessageSchema = new mongoose.Schema(
  {
  //    userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
    // required: true,
  // },
    name: {
         type: String, 
         required: true,
        },
    email: { 
        type: String, 
        required: true, },
    message: { 
        type: String, 
        required: true,  },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
export default ContactMessage;