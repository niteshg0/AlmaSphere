import { Router } from "express";
import {
  createConnection,
  acceptConnection,
  rejectConnection,
  getAllConnection,
} from "../controller/connectUserController.js";

const connectUserRouter = Router();

connectUserRouter.post("/connect", createConnection);

connectUserRouter.put("/accept/:id",acceptConnection);

connectUserRouter.put("/reject/:id",rejectConnection)

connectUserRouter.get("/connection/:userId",getAllConnection)

export default connectUserRouter