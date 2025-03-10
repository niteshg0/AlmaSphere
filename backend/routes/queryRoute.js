import {Router} from "express"
import { showAllQuery } from "../controller/Query/queryController.js";

const router= Router();

router.get("/", showAllQuery)

export default router;