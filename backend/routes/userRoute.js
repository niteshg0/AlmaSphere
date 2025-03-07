import { Router } from "express";

// user cotrollers
import {
  createUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  verifyCode
} from "../controller/userController.js";

// admin controllers
import { getAllUser } from "../controller/adminController.js";

// authentication
import authentication from "../middleware/authentication.js";

// autherization
import { authrizeAlumni, authrizeAdmin } from "../middleware/authrizeRole.js";

const router = Router();

// creating user
router
  .route("/")
  .post(createUser)
  .get(authentication, authrizeAdmin, getAllUser);

// login and logout
router.route("/auth").post(loginUser);
router.post("/logout",logoutUser)

// verify-code
// router.route("/verify/:email")
router.post("/verify/:email", verifyCode)

// alumni profile
router.route("/:id")
     .get(authentication, getUserProfile)

export default router;
