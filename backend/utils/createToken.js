import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, options);

  //   add cookie in headers
  res.cookie("authToken", token, {
    httpOnly: true, // Prevents client-side JS access for security
    secure: true, // Always use secure cookies for production and development
    sameSite: "none", // Allow cross-site cookie sending
    path: "/", // Make cookie available on all paths
    maxAge: 1 * 24 * 60 * 60 * 1000, // jwt for 1 day
  });

  return token;
};

export default generateToken;
