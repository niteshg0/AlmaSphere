import { Router } from "express";

import { searchUsers } from "../controller/SearchSection/searchController.js";

const router = Router()

router.get("/",searchUsers)

export default router