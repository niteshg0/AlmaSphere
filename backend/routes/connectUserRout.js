import { Router } from "express";
import {
  createConnection,
  acceptConnection,
  rejectConnection,
  getAllConnection,
  getAllUsers
} from "../controller/connectUserController.js";

import authentication from "../middleware/authentication.js";

const connectUserRouter = Router();

connectUserRouter.post("/connect", createConnection);

connectUserRouter.put("/accept/:id",acceptConnection);

connectUserRouter.put("/reject/:id",rejectConnection)

connectUserRouter.get("/connection/:userId",getAllConnection)

connectUserRouter.get("/allUsers",authentication,getAllUsers)

export default connectUserRouter