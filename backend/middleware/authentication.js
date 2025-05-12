import jwt, { decode } from "jsonwebtoken";
import User from "../model/User/userInfo.js";

const authentication = async (req, res, next) => {
  // Debug - log cookie headers in production
  console.log("Cookie headers:", req.headers.cookie);
  console.log("Auth cookie:", req.cookies);

  const token = req.cookies.authToken;
  if (!token) {
    console.log("Authentication failed: No auth token found in cookies");
    return res.status(400).json({ message: "Please Login" });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Token verified successfully for user:", decodeToken.userId);

    const user = await User.findById(decodeToken.userId).select("-password");

    if (!user) {
      console.log(
        "Authentication failed: User not found with ID:",
        decodeToken.userId
      );
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      req.user = user;
      return next();
    } else return res.status(400).json({ message: "Please verify your Email" });
  } catch (error) {
    console.log("JWT verification error:", error.name, error.message);
    return res.status(400).json({ message: "Error in authentication" });
  }
};

export default authentication;
