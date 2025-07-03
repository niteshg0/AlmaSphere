import { Router } from "express";
import {
  createConnection,
  acceptConnection,
  rejectConnection,
  getAllConnection,
  getConnectionStatus,
  getConnectionRequest,
  getUserConnection,
  getAllUsers,
  removeConnection
} from "../controller/connectUserController.js";

import authentication from "../middleware/authentication.js";

const connectUserRouter = Router();

connectUserRouter.post("/connect/:id",authentication, createConnection);
connectUserRouter.put("/accept/:connectionId",authentication,acceptConnection);
connectUserRouter.put("/reject/:connectionId",authentication,rejectConnection)
connectUserRouter.get("/getStatus/:userId",authentication,getConnectionStatus)
connectUserRouter.delete("/remove/:userId",authentication,removeConnection)
connectUserRouter.get("/requests",authentication,getConnectionRequest)
connectUserRouter.get("/",authentication,getUserConnection)
// 
// connectUserRouter.get("/connection/:userId",getAllConnection)
// connectUserRouter.get("/allUsers",authentication,getAllUsers)

export default connectUserRouter