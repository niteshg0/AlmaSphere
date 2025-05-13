import ExtraInfo from "../../model/User/extraInfo.js";

const editExtraCurricular = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  try {
    const extraInfo = await ExtraInfo.findOne({ userId });
    if (!extraInfo) {
      return res.status(404).json({ message: "ExtraInfo not found for user." });
    }

    const { extracurriculars } = req.body;

    const extracurricularsArray = Array.isArray(extracurriculars)
    ? extracurriculars
    : [extracurriculars];

    // Append new extracurriculars
    extraInfo.extracurriculars.push(...extracurricularsArray);

    const updatedExtraInfo = await extraInfo.save();

    return res.status(200).json({
      message: "Extracurricular activities added successfully . ",
      extracurriculars: updatedExtraInfo.extracurriculars,
    });
  } catch (error) {
    console.error("Error updating extracurriculars : ", error);
    return res
      .status(500)
      .json({ message: "Server error while updating extracurriculars . " });
  }
};

const editAchievements = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  try {
    const extraInfo = await ExtraInfo.findOne({ userId });
    if (!extraInfo) {
      return res.status(404).json({ message: "ExtraInfo not found for user." });
    }

    const { achievements } = req.body;


  const achievementsArray = Array.isArray(achievements)
    ? achievements
    : [achievements];



    // Append new achievements
    extraInfo.achievements.push(...achievementsArray);

    const updatedExtraInfo = await extraInfo.save();

    return res.status(200).json({
      message: "Achievements added successfully.",
      achievements: updatedExtraInfo.achievements,
    });
  } catch (error) {
    console.error("Error updating achievements:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating achievements." });
  }
};

export { editExtraCurricular,editAchievements };
