import { instance } from "../index.js";
import { Donation } from "../model/donation.js";
import AnalyticsInfo from "../model/User/analyticsInfo.js";
import User from "../model/User/userInfo.js";
import crypto from "crypto";

/**
 * Creates a Razorpay order for donation
 */
export const create_donation = async (req, res) => {
  try {
    const { rollNumber, amount, donationType, message } = req.body;

    if (!rollNumber || !amount || !donationType) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Missing required donation parameters",
        });
    }

    // Create a unique receipt ID for better tracking
    const receipt = `donation_${donationType}_${Date.now()}`;

    // Create Razorpay order
    const options = {
      amount: Number(amount) * 100, // Convert to paise
      currency: "INR",
      receipt: receipt,
      notes: {
        rollNumber,
        donationType,
        message: message || "",
        paymentType: "donation",
      },
    };

    const donation = await instance.orders.create(options);

    if (!donation || !donation.id) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create donation order" });
    }

    // Find user
    const user = await User.findOne({ rollNumber });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Save donation record
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

    // Return order details
    res.status(200).json({
      success: true,
      donation: {
        id: donation.id,
        amount: donation.amount,
        currency: donation.currency,
        receipt: donation.receipt,
      },
      keyId: process.env.RAZOR_PAY_KEY_ID || "",
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * Verifies Razorpay payment signature and updates donation status
 */
export const verify_donation = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Check if all required parameters exist
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.log("Missing parameters:", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      return res
        .status(400)
        .json({
          success: false,
          message: "Missing required verification parameters",
        });
    }

    // Verify signature
    const secret = process.env.RAZOR_PAY_API_SECRET;

    if (!secret) {
      console.error("Razorpay API secret not found in environment variables");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    // Manually create signature and compare
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValidSignature = generated_signature === razorpay_signature;

    console.log("Signature verification:", {
      isValid: isValidSignature,
      orderId: razorpay_order_id,
    });

    if (!isValidSignature) {
      // Update donation status to failed
      await Donation.findOneAndUpdate(
        { "donations.razorpay_order_id": razorpay_order_id },
        {
          $set: {
            "donations.$.status": "Failed",
            "donations.$.verification_failure": "Invalid signature",
          },
        }
      );

      return res
        .status(400)
        .json({
          success: false,
          message: "Payment verification failed: Invalid signature",
        });
    }

    // Payment is valid, update donation status
    const verifiedDonation = await Donation.findOneAndUpdate(
      { "donations.razorpay_order_id": razorpay_order_id },
      {
        $set: {
          "donations.$.status": "Verified",
          "donations.$.razorpay_payment_id": razorpay_payment_id,
          "donations.$.verified_at": new Date(),
        },
      },
      { new: true }
    );

    if (!verifiedDonation) {
      console.error("Donation not found for order:", razorpay_order_id);
      return res
        .status(404)
        .json({ success: false, message: "Donation record not found" });
    }

    console.log("Donation verified:", verifiedDonation._id);

    // Update analytics for the donor
    const donationEntry = verifiedDonation.donations.find(
      (don) => don.razorpay_order_id === razorpay_order_id
    );

    if (!donationEntry) {
      console.error("Donation entry not found in verified donation");
      return res
        .status(500)
        .json({ success: false, message: "Error updating donation analytics" });
    }

    const userId = verifiedDonation.donor;
    const donationAmount = donationEntry.amount;

    // Update analytics record
    const analytics = await AnalyticsInfo.findOneAndUpdate(
      { userId: userId },
      { $inc: { Donation: donationAmount } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Link analytics to user if not already linked
    if (analytics) {
      const user = await User.findById(userId).select("analyticsId");

      if (user && !user.analyticsId) {
        user.analyticsId = analytics._id;
        await user.save();
      }
    }

    console.log("payment verified and analytics updated");
    

    return res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });

    // // Determine frontend URL for redirect
    // const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5500";
    // const redirectUrl = `${frontendUrl}/donation/verify?reference=${razorpay_payment_id}&status=success`;

    // console.log("Redirecting to:", redirectUrl);
    // res.redirect(redirectUrl);
  } catch (error) {
    console.error("Payment verification error:", error);

    // Redirect to frontend with error status
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5500";
    const redirectUrl = `${frontendUrl}/donation/verify?status=error&message=${encodeURIComponent(
      error.message
    )}`;

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error.message });

    // res.redirect(redirectUrl);
  }
};

/**
 * API endpoint for verifying payment (used by frontend directly)
 */
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ verified: false, error: "Missing verification parameters" });
    }

    const secret = process.env.RAZOR_PAY_API_SECRET;

    if (!secret) {
      return res
        .status(500)
        .json({ verified: false, error: "Server configuration error" });
    }

    // Generate signature and verify
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isAuthentic = generated_signature === razorpay_signature;

    if (isAuthentic) {
      // Find donation details
      const donation = await Donation.findOne(
        { "donations.razorpay_order_id": razorpay_order_id },
        { "donations.$": 1, donor: 1 }
      );

      return res.status(200).json({
        verified: true,
        paymentId: razorpay_payment_id,
        donationId: donation ? donation._id : null,
      });
    } else {
      return res
        .status(400)
        .json({ verified: false, error: "Invalid signature" });
    }
  } catch (error) {
    console.error("API verification error:", error);
    return res.status(500).json({ verified: false, error: error.message });
  }
};
