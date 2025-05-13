import SkillInfo from "../../model/User/skillInfo.js";

const editUserSkills = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(402).json({ message: "please login..." });
    }
    const skills = await SkillInfo.findOne({ userId });
    if (!skills) {
      return res.status(403).json({ message: "skill not founded..." });
    }
    let {technicalSkill,nonTechnicalSkill} = req.body
    if (typeof technicalSkill === "string") {
      technicalSkill = technicalSkill.split(",").map((skill) => skill.trim());
    }

    if (typeof nonTechnicalSkill === "string") {
      nonTechnicalSkill = nonTechnicalSkill.split(",").map((skill) => skill.trim());
    }

     if (Array.isArray(technicalSkill)) {
      skills.technicalSkill.push(...technicalSkill);
    }

    if (Array.isArray(nonTechnicalSkill)) {
      skills.nonTechnicalSkill.push(...nonTechnicalSkill);
    }

    await skills.save();
    return res
      .status(202)
      .json({ skills });
  } catch (err) {
    console.log(err.message);
    return res.status(403).json({ message: "server error..." });
  }
};

export { editUserSkills };
