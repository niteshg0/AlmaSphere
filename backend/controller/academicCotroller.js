import Academic from "../model/academicModel.js";

const createAcademicDetaile = async (req, res) => {
  const userId = await req.user._id;
  const {
    degree,
    department,
    year_of_graduation,
    cgpa,
    achievements,
    extracurriculars,
  } = req.body;

  if (!degree || !department || !year_of_graduation || !cgpa) {
    return res.status(401).json({ message: "All fields are requied..." });
  }

  const checkAlreadyExist = await Academic.findOne({userId})
  if(checkAlreadyExist){
    return res.status(402).json({message:"already exist"})
  }
  const newAcademicDetail = new Academic({
    userId,
    degree,
    department,
    year_of_graduation,
    achievements,
    extracurriculars,
    cgpa,
  });

  try {
    const savedAcademicInfo = await newAcademicDetail.save();

    return res.status(201).json({
      degree: savedAcademicInfo.degree,
      department: savedAcademicInfo.department,
      year_of_graduation: savedAcademicInfo.year_of_graduation,
      achievements: savedAcademicInfo.achievements,
      extracurriculars: savedAcademicInfo.extracurriculars,
      cgpa: savedAcademicInfo.cgpa,
    });
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

const getAcademicDetails = async (req, res) => {
  const userId = await req.user._id;

  if (!userId) {
    return res.status(402).json({ message: "userId not found ...." });
  }
  try {
    const userAcademicDetails = await Academic.findOne({ userId });
    return res.status(201).json(userAcademicDetails);
  } catch (error) {
    console.log("error : ", error.message);
  }
};

const addAcheivement = async (req, res) => {
  const userId = await req.user._id;
  try {
    const { title, description, date } = req.body;
    if (!title || !description || !date) {
      return res.status(404).json({ message: "all fields require.." });
    }
    const academic = await Academic.findOne({ userId });
    academic.achievements.push({ title, description, date });
    await academic.save();
    return res.status(200).json(academic);
  } catch (e) {
    console.log("error : ", e.message);
    return res.status(402).json({ message: "id not found! ..." });
  }
};

export { createAcademicDetaile, getAcademicDetails, addAcheivement };
