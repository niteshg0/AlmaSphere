import {Router} from "express"
import { downvotes, postAnswer, postQuestion, showAllAnswer, postComment, showAllQuery, upvotes } from "../controller/Query/queryController.js";
import authentication from "../middleware/authentication.js";

const router= Router();

router.get("/", showAllQuery)

router.post("/question", authentication, postQuestion)

// router.route("/question/:questionId")
router.get("/:questionId", showAllAnswer)
router.post("/:questionId/upvote", authentication, upvotes)
router.post("/:questionId/downvote", authentication, downvotes)
router.post("/:questionId/answer", authentication, postAnswer)
router.post("/answer/:answerId/comment", authentication, postComment)
// router.post("/:questionId/answer/:answerId/upvote", authentication, answerUpvote);
// router.post("/:questionId/answer/:answerId/upvote", authentication, answerDownvote)

export default router;