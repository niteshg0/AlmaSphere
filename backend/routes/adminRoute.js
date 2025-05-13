import {Router} from "express";
import { getCollege_data, postCollege_data } from "../controller/college_dataController.js";
// import authentication from "../middleware/authentication.js";

const router = Router();


router.get("/all-Data",  getCollege_data);
router.post("/add-edit-Data",  postCollege_data);

export default router;