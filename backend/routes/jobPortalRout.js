import { Router } from "express";
import {
  createJobs,
  getAllJobsDetails,
  getOneJobDetails,
} from "../controller/jobPortalController.js";
import authentication from "../middleware/authentication.js";

const router = Router();

router.route("/").get(getAllJobsDetails).post(authentication, createJobs);
router.get("/:id", getOneJobDetails);

export default router;
