import { Router } from "express";
import { create_donation, verify_donation } from "../controller/donationControlller.js";

const donationRouter= Router();

donationRouter.route("/")
    .post(create_donation)

donationRouter.route("/verify")
    .post(verify_donation)

export default donationRouter;