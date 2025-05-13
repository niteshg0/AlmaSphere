import User from "../model/User/userInfo.js";
import SkillInfo from "../model/User/skillInfo.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import JobInfo from "../model/User/jobInfo.js";
import ExtraInfo from "../model/User/extraInfo.js";
import College_data from "../model/College_data.js";
import Admin from "../model/admin_model.js";

async function sendVerificationEmail(email, code) {
  console.log(email, code);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alumniteam95@gmail.com",
      pass: "jdde essm exwg pptw",
    },
  });

  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   auth: {
  //       user: 'jayden.ritchie62@ethereal.email',
  //       pass: 'RCRpx4kU4TZ59V438C'
  //   }
  // });

  let mailOptions = {
    // from: 'alumniteam95@gmail.com',
    from: "Alumni Association <alumniteam95@gmail.com>",
    to: email,
    subject: "Your OTP Code",
    html: `
          <div style="font-family: Arial, sans-serif; text-align: center;">
              <h2>OTP Verification</h2>
              <p>Your One-Time Password (OTP) for verification is:</p>
              <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 15px 0;
                          padding: 10px 20px; border: 2px dashed #007BFF; display: inline-block;">
                  ${code}
              </div>
              <p>This OTP is valid for 1 hour. Do not share it with anyone.</p>
          </div>
      `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const createUser = async (req, res) => {
  const {
    rollNumber,
    fullName,
    email,
    password,
    gender,
    batch,
    course,
    branch,
    cgpa,
  } = req.body;

  const college_user = await College_data.findOne({ rollNumber });

  if (
    rollNumber != college_user.rollNumber &&
    fullName != college_user.fullName &&
    email != college_user.email
  ) {
    return res.status(400).json({ message: "Data is not correct" });
  }

  const batchYear = Number(batch.slice(-4));
  let currentYear = new Date().getFullYear();
  const role = currentYear >= batchYear ? "Alumni" : "Student";

  // Checking the user exist or not
  const checkUserExists = await User.findOne({ rollNumber });
  console.log("Existing User:", checkUserExists);

  // if (checkUserExists) {
  //   return res.status(409).send("User already exists.");
  // }

  // Hashing password....
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Creating a new User ...
  const newUser = new User({
    rollNumber: college_user.rollNumber,
    fullName: college_user.fullName,
    email: college_user.email,
    password: hashPassword,
    role,
    gender: college_user.gender,
    batch: college_user.batch,
    course: college_user.course,
    branch: college_user.branch,
    cgpa: college_user.cgpa,
    isVerified: college_user.isVerified,
  });

  // newUser.verifyCode = Math.floor(Math.random() * 9000 + 1000);
  // newUser.codeExpiry = new Date(Date.now() + 3600000);

  try {
    const savedUser = await newUser.save();

    // await sendVerificationEmail(savedUser.email, savedUser.verifyCode);
    // generating token
    generateToken(res, savedUser._id);
    return res.status(201).json({
      _id: savedUser._id,
      rollNumber: savedUser.rollNumber,
      fullName: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.role,
      gender: savedUser.gender,
      batch: savedUser.batch,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

const verify_roll = async (req, res) => {
  try {
    const { rollNumber } = req.params;

    const rollExist = await College_data.findOne({ rollNumber });

    if (!rollExist) {
      return res.status(500).json({ message: "RollNumber Does Not Exist" });
    }

    const is_registered = await User.findOne({ rollNumber });

    if (is_registered) {
      return res.status(500).json({ message: "RollNumber already Registered" });
    }

    rollExist.verifyCode = Math.floor(Math.random() * 9000 + 1000);
    rollExist.codeExpiry = new Date(Date.now() + 3600000);

    const savedUser = await rollExist.save();

    // const { verifyCode, codeExpiry, ...user } = savedUser.toObject();
    // console.log(user);

    await sendVerificationEmail(savedUser.email, savedUser.verifyCode);

    return res.status(200).json({
      message: "RollNumber Exist",
      data: {},
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in Verifying Roll Number" });
  }
};

const verify_Roll_Code = async (req, res) => {
  const { code } = req.body;
  // console.log("code", code, req);

  const { rollNumber } = req.params;

  try {
    const foundUser = await College_data.findOne({ rollNumber });

    if (!foundUser) {
      return res.status(404).json({ message: "RollNumber Not Exist..." });
    }

    const { verifyCode, codeExpiry, isVerified, ...userData } =
      foundUser.toObject();

    const foundUserVerifyCode = foundUser.verifyCode;
    const foundUserexpiry = foundUser.codeExpiry;

    const isnotExpired = foundUserexpiry > Date.now();

    const codeVerification = code == foundUserVerifyCode;

    if (codeVerification && isnotExpired) {
      foundUser.isVerified = true;
      console.log(foundUser.isVerified);

      await foundUser.save();

      return res
        .status(200)
        .json({ message: "User verified successfully.", data: userData });
    } else {
      if (!isnotExpired) {
        return res.status(400).json({ message: "Code Expired" });
      } else {
        return res.status(400).json({ message: "Incorrect Verification Code" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "could not run verify-code" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { rollNumberOrEmail, password, role } = req.body;

    console.log("login", role);

    if (role === "Admin") {
      if (!isNaN(rollNumberOrEmail)) {
        return res.status(404).json({
          message: "Login Through Email Only",
        });
      }

      const email = rollNumberOrEmail;
      const adminUser = await Admin.findOne({ email });

      if (!adminUser) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Add password validation for admin
      const isValidPassword = await bcrypt.compare(
        password,
        adminUser.password
      );
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = generateToken(res, adminUser._id);
      return res.status(200).json({
        message: "Admin LoggedIn Successfully",
        rollNumber: adminUser.rollNumber || "2023071049",
        fullName: adminUser.fullName,
        email: adminUser.email,
        role: adminUser.role,
        token: token,
      });
    }

    // Rest of the code for regular user login
    let findUser = isNaN(Number(rollNumberOrEmail))
      ? await User.findOne({ email: rollNumberOrEmail })
      : await User.findOne({ rollNumber: rollNumberOrEmail });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, findUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(res, findUser._id);

    return res.status(200).json({
      message: "User LoggedIn Successfully",
      rollNumber: findUser.rollNumber,
      fullName: findUser.fullName,
      email: findUser.email,
      role: findUser.role,
      gender: findUser.gender,
      batch: findUser.batch,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true, // Ensures client-side JS cannot access it
    secure: true, // Always use secure cookies
    sameSite: "none", // Allow cross-site cookie clearing
    path: "/", // Match the cookie path when clearing
  });
  res.status(200).json({ message: "logout successfully..." });
};

const getUserProfile = async (req, res) => {
  const id = await req.user._id;
  if (!id) {
    return res.status(401).json({ message: "Not login..." });
  }
  try {
    const user = await User.findById(id).populate([
      "extraId",
      "analyticsId",
      "jobId",
      "skillId",
    ]);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const addUserSkills = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(402).json({ message: "userId not found.." });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(402).json({ message: "user not found.." });
  }
  const existingSkill = await SkillInfo.findOne({ userId });
  if (existingSkill) {
    return res
      .status(403)
      .json({ message: "you can only update the skill...." });
  }
  let { technicalSkill, nonTechnicalSkill } = req.body;
  if (typeof technicalSkill === "string") {
    technicalSkill = technicalSkill
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
  }
  if (typeof nonTechnicalSkill === "string") {
    nonTechnicalSkill = nonTechnicalSkill
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
  }

  try {
    const newSkills = new SkillInfo({
      userId,
      technicalSkill,
      nonTechnicalSkill,
    });

    const savedSkills = await newSkills.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { skillId: savedSkills._id },
      { new: true }
    );

    return res.status(202).json({
      savedSkills,
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({ message: "error in saving skills.." });
  }
};

const addUserJobInfo = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(402).json({ message: "userId not found.." });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(402).json({ message: "user not found.." });
  }
  const existingJobId = await JobInfo.findOne({ userId });
  if (existingJobId) {
    return res
      .status(403)
      .json({ message: "you can only update the job info...." });
  }
  const { companyName, position, duration, location, previousCompany } =
    req.body;
  if (previousCompany && !Array.isArray(previousCompany)) {
    return res.status(403).json({ message: "provide an array..." });
  }
  try {
    const newJobInfo = new JobInfo({
      userId,
      companyName,
      position,
      duration,
      location,
      previousCompany,
    });
    const saveJobInfo = await newJobInfo.save();
    const user = await User.findByIdAndUpdate(
      userId,
      { jobId: saveJobInfo._id },
      { new: true, upsert: true }
    );
    return res.status(202).json({
      saveJobInfo,
    });
  } catch (e) {
    console.log(e);
    return res.status(502).json({ message: "error in saving jobDtails.." });
  }
};

const addExtraInfo = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(402).json({ message: "userId not found.." });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(402).json({ message: "user not found.." });
  }

  const { achievements, extracurriculars } = req.body;

  const achievementsArray = Array.isArray(achievements)
    ? achievements
    : [achievements];

  const extracurricularsArray = Array.isArray(extracurriculars)
    ? extracurriculars
    : [extracurriculars];

  achievementsArray.forEach((achievement) => {
    if (achievement.date && typeof achievement.date === "string") {
      // Convert date string to Date object
      achievement.date = new Date(achievement.date);
    }
  });
  try {
    const newExtraInfo = new ExtraInfo({
      userId,
      achievements: achievementsArray,
      extracurriculars: extracurricularsArray,
    });

    const saveExtraInfo = await newExtraInfo.save();
    const user = await User.findByIdAndUpdate(
      userId,
      { extraId: saveExtraInfo._id },
      { new: true, upsert: true }
    );
    return res.status(202).json({
      saveExtraInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(502).json({ message: "some server error occure..." });
  }
};

const verifyCode = async (req, res) => {
  const { code } = req.body;
  const { email } = req.params;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found..." });
    }

    const foundUserVerifyCode = foundUser.verifyCode;
    const foundUserexpiry = foundUser.codeExpiry;

    const isnotExpired = foundUserexpiry > Date.now();

    const codeVerification = code == foundUserVerifyCode;

    if (codeVerification && isnotExpired) {
      foundUser.isVerified = true;
      await foundUser.save();
      return res.status(200).json({ message: "User verified successfully." });
    } else {
      if (!isnotExpired) {
        return res.status(400).json({ message: "Code Expired" });
      } else {
        return res.status(400).json({ message: "Incorrect Verification Code" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "could not run verify-code" });
  }
};

const getProfile = async (req, res) => {
  const rollNumber = req.params.rollNumber;
  try {
    const user = await User.find({ rollNumber: rollNumber }).populate([
      "extraId",
      "analyticsId",
      "jobId",
      "skillId",
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  createUser,
  loginUser,
  getUserProfile,
  logoutUser,
  verifyCode,
  addUserSkills,
  getProfile,
  addUserJobInfo,
  addExtraInfo,
  verify_roll,
  verify_Roll_Code,
  // updateUserSkills,
};
