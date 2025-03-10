import mongoose from "mongoose";

const questionSchema= new mongoose.Schema({
    askedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
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
        enum: ['Career', 'Technical', 'Benefits', 'General'], 
        default: 'General' 
    },

    status: { 
        type: String, 
        enum: ['Open', 'In Progress', 'Resolved'], 
        default: 'Open' 
    },

    upvotes: { 
        type: Number, 
        default: 0 
    },

    downvotes: { 
        type: Number, 
        default: 0 
    },

    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export const Question= mongoose.model("question", questionSchema);