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

const editProfile = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  const { profile_image } = req.body; // make sure the field matches what you send from frontend

  if (!profile_image) {
    return res.status(400).json({ message: "Please provide the profile image URL." });
  }

  try {
    // Find the existing user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the profile_image field
    user.profile_image = profile_image;

    // Save the updated user
    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error while updating profile." });
  }
};

const getPhoto = async (req, res) => {
  try {
    const userId = req.user._id;

    // find the user
    const user = await User.findById(userId).select("profile_image");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile photo fetched successfully.",
      profile_image: user.profile_image || null, // return null if not set
    });
  } catch (error) {
    console.error("Error fetching profile photo:", error);
    return res.status(500).json({ message: "Server error while fetching photo." });
  }
};



export { editUserInfo , editProfile , getPhoto};
