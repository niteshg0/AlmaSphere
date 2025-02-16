import { instance } from "../index.js";
import { Donation } from "../model/donation.js";
import User from "../model/userModel.js";
import pkg from "razorpay";
const { validateWebhookSignature } = pkg;

export const create_donation = async (req, res) => {
  try {
    const { rollNumber, amount, donationType, message } = req.body;

    const options = {
      amount: Number(amount) * 100, //to convert in paise
      currency: "INR",
    };

    const donation = await instance.orders.create(options);

    // if(!donation){
    //     return res.status(400).json({ message: "Failed to create donation order" });
    // }

    const user = await User.findOne({ rollNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let userDonation = await Donation.findOne({ donor: user._id });

    if (userDonation) {
      userDonation.donations.push({
        status: "Created",
        amount,
        donationType,
        message,
        razorpay_order_id: donation.id,
      });

      await userDonation.save();
    } else {
      userDonation = await Donation.create({
        donor: user._id,
        donations: [
          {
            status: "Created",
            amount,
            donationType,
            message,
            razorpay_order_id: donation.id,
          },
        ],
      });
    }

    console.log("Donation", userDonation);
    console.log("donation", donation);

    res.status(200).json({ donation });
  } catch (error) {
    console.log("error in create_order ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verify_donation = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  // console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

  const secret = process.env.RAZOR_PAY_API_SECRET;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );

    if (isValidSignature) {
      // Update the order with payment details

      await Donation.findOneAndUpdate(
        { "donations.razorpay_order_id": razorpay_order_id },
        {
          $set: {
            "donations.$.status": "Verified",
            "donations.$.razorpay_payment_id": razorpay_payment_id,
          },
        },
        { new: true }
      );

      // res.status(200).json({ status: 'ok' });
      // console.log("Payment verification successful");

      res.redirect(
        `http://localhost:5500/donation/verify?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({ status: "verification_failed" });
      console.log("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Error verifying payment" });
  }
};
