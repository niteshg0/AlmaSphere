import User from "../../model/User/userInfo.js";

const editUserInfo = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  const { fullName, branch, cgpa, batch } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update fields if provided
    if (fullName) user.fullName = fullName;
    if (branch) user.branch = branch;
    if (cgpa) user.cgpa = cgpa;
    if (batch) user.batch = batch;

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating profile." });
  }
};

export { editUserInfo };
