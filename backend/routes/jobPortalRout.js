import { Router } from "express";
import {
  createJobs,
  getAllJobsDetails,
  getOneJobDetails,
} from "../controller/jobPortalController.js";
import authentication from "../middleware/authentication.js";

const jobPortalRouter = Router();

jobPortalRouter.route("/").get(getAllJobsDetails).post(authentication, createJobs);
jobPortalRouter.get("/:id", getOneJobDetails);

export default jobPortalRouter;
