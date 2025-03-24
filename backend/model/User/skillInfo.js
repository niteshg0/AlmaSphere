import mongoose from "mongoose";

const skillInfo= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    technicalSkill: {
        type: [String],
        default:[] //this is for that it doesn't hold the undefined value
    },
    nonTechnicalSkill: {
        type: [String],
        default:[]
    },
}, {timestamps: true})


const SkillInfo= mongoose.model("Skill", skillInfo);

export default SkillInfo;