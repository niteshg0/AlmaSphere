import {Router} from "express";
import { getCollege_data, postCollege_data } from "../controller/college_dataController.js";

const router = Router();


router.get("/allData", getCollege_data);
router.post("/addData", postCollege_data);

export default router;