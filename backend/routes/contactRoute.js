import { Router } from "express";
import { submitContactMessage} from "../controller/contactController.js";


const router = Router();

router.post("/", submitContactMessage);
export default router;