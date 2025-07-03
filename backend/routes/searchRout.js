import { Router } from "express";
import { searchUsers } from "../controller/SearchSection/searchController.js";

const router = Router();

// Change from GET to POST since the query is now in the request body
router.post("/", searchUsers);

export default router;