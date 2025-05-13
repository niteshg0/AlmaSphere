import mongoose from "mongoose";

const questionSchema= new mongoose.Schema({
    askedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
    },

    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer"
    }],

    category: { 
        type: String, 
        enum: ['Career', 'Technical', 'Academic', 'General'], 
        default: 'General' 
    },

    status: { 
        type: String, 
        enum: ['Open', 'In Progress', 'Resolved'], 
        default: 'Open' 
    },

    upvotes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }],

    downvotes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})
// Add a text index for full-text search
questionSchema.index({title: "text", content: "text"})

export const Question= mongoose.model("question", questionSchema);