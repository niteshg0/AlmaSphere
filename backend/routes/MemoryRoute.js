import { Router } from "express";
import { PostPhotoes, getAllMemories, showAllPhotoes, upvoteImage, downvoteImage } from "../controller/MemoryFormController.js";
import authentication from "../middleware/authentication.js";


const router = Router();
router.get("/", getAllMemories); // All memories
router.get("/:id", showAllPhotoes); // By tag
router.post("/post",authentication, PostPhotoes); // Add memory
router.post("/photo/:photoid/upvote",authentication, upvoteImage);
router.post("/photo/:photoid/downvote",authentication, downvoteImage);

export default router;
