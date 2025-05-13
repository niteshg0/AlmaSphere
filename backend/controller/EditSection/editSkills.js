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
    if (req.body.technicalSkill && Array.isArray(req.body.technicalSkill)) {
      skills.technicalSkill.push(...req.body.technicalSkill);
    }
    if (skills.nonTechnicalSkill && Array.isArray(req.body.nonTechnicalSkill)) {
      skills.nonTechnicalSkill.push(...req.body.nonTechnicalSkill);
    }
    await skills.save();
    return res
      .status(202)
      .json({ message: "skill added successfully", skills });
  } catch (err) {
    console.log(err.message);
    return res.status(403).json({ message: "server error..." });
  }
};

export { editUserSkills };
