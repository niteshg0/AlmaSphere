import mongoose from "mongoose";

const skillInfo= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    technicalSkill: {
        type: [String]
    },
    nonTechnicalSkill: {
        type: [String]
    },
}, {timestamps: true})


const SkillInfo= mongoose.model("Skill", skillInfo);

export default SkillInfo;