import { Router } from "express";

// user cotrollers
import {
  createUser,
  loginUser,
  getUserProfile,
  getProfile,
  logoutUser,
  addUserJobInfo,
  addUserSkills,
  // updateUserSkills,
  verifyCode,
  verify_roll,
  verify_Roll_Code,
  addExtraInfo,
  // verifyCode
} from "../controller/userController.js";

// admin controllers
// import { getAllUser } from "../controller/adminController.js";

// authentication
import authentication from "../middleware/authentication.js";

// autherization
import { authrizeAlumni, authrizeAdmin } from "../middleware/authrizeRole.js";

// edit
import { editJobInfo } from "../controller/EditSection/editJobs.js";
import { editUserSkills } from "../controller/EditSection/editSkills.js";
import { editUserInfo } from "../controller/EditSection/editProfile.js";
import { editAchievements, editExtraCurricular } from "../controller/EditSection/editExtra.js";

const router = Router();

// creating user
router.route("/").post(createUser)
router.post("/verify/:rollNumber", verify_roll)
router.post("/verify/:rollNumber/code", verify_Roll_Code)
router.route("/profile").get(authentication, getUserProfile);
router.route("/profile").post(createUser).get(authentication, getUserProfile);
router.put("/updateUserProfile",authentication,editUserInfo)

// login and logout
router.route("/auth").post(loginUser);
router.post("/logout", logoutUser);

// extra carricular
router.post("/addExtraInfo",authentication,addExtraInfo)
router.put("/updateAchievement",authentication,editAchievements)
router.put("/updateExtracarricular",authentication,editExtraCurricular)

// job info
router.post("/addUserJobInfo",authentication,addUserJobInfo)
router.put("/updateJobInfo",authentication,editJobInfo)

// user skills
router.post("/addUserSkills",authentication,addUserSkills)
router.put("/updateSkills",authentication,editUserSkills)

// verify-code
// router.route("/verify/:email")
router.post("/verify/:email", verifyCode);

router.get("/:rollNumber", authentication, getProfile);



export default router;
