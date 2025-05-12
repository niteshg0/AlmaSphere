import jwt, { decode } from "jsonwebtoken";
import User from "../model/User/userInfo.js";

const authentication = async (req, res, next) => {
  // Debug - log cookie headers in production
  // console.log("Cookie headers:", req.headers.cookie);
  // console.log("Auth cookie:", req.cookies);
  // console.log("Authorization header:", req.headers.authorization);

  // First try to get token from cookies
  let token = req.cookies.authToken;

  // If no cookie token, check Authorization header
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Using token from Authorization header");
  }

  if (!token) {
    console.log(
      "Authentication failed: No auth token found in cookies or headers"
    );
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
