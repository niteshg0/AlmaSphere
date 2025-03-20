import mongoose from "mongoose";

const extraInfo= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    achievements: [{
        title: {
            type: String,
        },
        description: {
            type: String, 
        },
        date: {
            type: Date, 
        },
    }],
    extracurriculars: [{
        activity: {
            type: String,
            required: true, 
        },
        description: {
            type: String,
        },
        duration: {
            type: String, 
        },
    }],
}, {timestamps: true})


const ExtraInfo= mongoose.model("Skill", extraInfo);

export default ExtraInfo;