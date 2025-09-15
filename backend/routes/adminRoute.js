import {Router} from "express";
import { getCollege_data, postCollege_data, upload_Excel } from "../controller/college_dataController.js";

import multer from "multer";
// import authentication from "../middleware/authentication.js";

const router = Router();

const upload= multer({dest: "uploads/"});


router.get("/all-Data",  getCollege_data);
router.post("/add-edit-Data",  postCollege_data);
router.post("/upload-excel", upload.single("file"), upload_Excel)

export default router;