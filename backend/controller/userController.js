import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const createUser = async (req, res) => {
  const { rollNumber, fullName, email, password, role,gender,batch } = req.body;
  if (!rollNumber || !fullName || !email || !password || !gender || !batch) {
    return res.status(400).json({ message: "All inputs are required." });
  }

  // Checking the user exist or not
  const checkUserExists = await User.findOne({ email });
  console.log("Existing User:", checkUserExists);

  if (checkUserExists) {
    return res.status(409).send("User already exists.");
  }

  // Hashing password....
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Creating a new User ...
  const newUser = new User({
    rollNumber,
    fullName,
    email,
    password: hashPassword,
    role,
    gender,
    batch
  });

  try {
    const savedUser = await newUser.save();
    // generating token
    generateToken(res, savedUser._id);
    return res.status(201).json({
      _id: savedUser._id,
      rollNumber: savedUser.rollNumber,
      fullName: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.role,
      gender:savedUser.gender,
      batch:savedUser.batch
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

const loginUser = async (req, res) => {
  const { rollNumber, password } = req.body;
  const findUser = await User.findOne({ rollNumber });
  if (findUser) {
    const passwordValidation = await bcrypt.compare(
      password,
      findUser.password
    );
    if (passwordValidation) {
      // generate tokens
      generateToken(res, findUser._id);
      return res.status(200).json({
        rollNumber: findUser.rollNumber,
        fullName: findUser.fullName,
        email: findUser.email,
        role: findUser.role,
        gender:findUser.gender,
        batch:findUser.batch
      });
    } else {
      return res.status(401).json({ message: "Invalid password..." });
    }
  } else {
    return res.status(404).json({ message: "User not found..." });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true, // Ensures client-side JS cannot access it
    // secure: process.env.NODE_ENV === 'production', // Ensures it's only cleared over HTTPS in production
    sameSite: "strict",
  });
  res.status(200).json({ message: "logout successfully..." });
};

const getUserProfile = async (req, res) => {
  const id = await req.user._id;
  if (!id) {
    return res.status(401).json({ message: "not login..." });
  }
  try {
    const user = await User.findById(id);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.rollNumber = req.body.rollNumber || user.rollNumber;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashPassword;
      }
    }
    return res.status(201).json(user);
  } catch (error) {
    console.log("error : ", error.message);
  }
};

export { createUser, loginUser, getUserProfile, logoutUser, updateUserProfile };
