import {Router} from "express";
import { getCollege_data, postCollege_data } from "../controller/college_dataController.js";
import authentication from "../middleware/authentication.js";

const router = Router();


router.get("/allData", authentication , getCollege_data);
router.post("/addData", authentication, postCollege_data);

export default router;