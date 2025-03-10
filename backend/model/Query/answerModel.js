import mongoose from "mongoose"

const answerSchema= new mongoose.Schema({
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question"
    },

    answer: {
        type: String,
        require: true,
    },

    upvotes: { 
        type: Number, 
        default: 0 
    },

    downvotes: { 
        type: Number, 
        default: 0 
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "comment"
    }],

    createdAt: {
        type: Date,
        default: Date.now,
        require: true,
    }
})

export const Answer= mongoose.model("answer", answerSchema);