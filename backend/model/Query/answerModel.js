import mongoose from "mongoose"

const answerSchema= new mongoose.Schema({
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },

    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        require: true,
    },

    answer: {
        type: String,
        require: true,
    },

    upvotes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user" 
    }],

    downvotes:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user" 
    }],

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

answerSchema.index({answer: "text"});

export const Answer= mongoose.model("answer", answerSchema);