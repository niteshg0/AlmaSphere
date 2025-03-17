import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    answerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "answer", 
        required: true 
    },
    
    commentedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },

    content: { 
        type: String, 
        required: true 
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    },
  });
  
 export const Comment = mongoose.model("comment", CommentSchema);

 