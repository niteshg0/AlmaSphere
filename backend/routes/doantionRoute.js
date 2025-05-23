import { Router } from "express";
import { create_donation, verify_donation } from "../controller/donationControlller.js";
import authentication from "../middleware/authentication.js";

const donationRouter= Router();

donationRouter.route("/")
    .post(authentication, create_donation)

donationRouter.route("/verify")
    .post(  verify_donation)

export default donationRouter;