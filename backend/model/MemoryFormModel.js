import mongoose from "mongoose";

const MemoryFormSchema = new mongoose.Schema({
  PostedBy: {
    type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
  },

  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Number,
    required: true,
  },
  GallaryImages: 
    [{type: String}]
   ,

  description: {
    type: String,
    required: true,
  },

  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  downvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, { timestamps: true });
export const MemoryForm = mongoose.model("memoryForm", MemoryFormSchema)
