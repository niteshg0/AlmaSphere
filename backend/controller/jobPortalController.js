import JobPortal from "../model/jobPortalModel.js";
import User from "../model/userModel.js";

const createJobs = async (req, res) => {
  const userId = await req.user?._id;
  if (!userId) {
    return res.status(402).json({ message: "not authrize to create jobs.." });
  }
  const { title, description, companyName, applyLink } = req.body;
  if (!title || !description || !companyName || !applyLink) {
    return res.status(402).json({ message: "all fields are required...." });
  }
  const jobDetail = new JobPortal({
    userId,
    title,
    description,
    companyName,
    applyLink,
  });

  try {
    const saveDetails = await jobDetail.save();

    return res.status(202).json({
      userId: saveDetails.userId,
      title: saveDetails.title,
      description: saveDetails.description,
      companyName: saveDetails.companyName,
      applyLink: saveDetails.applyLink,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server issue..."})
  }
};

const getAllJobsDetails = async (req, res) => {
  const allJobDetails = await JobPortal.find({});
  res.status(202).json(allJobDetails);
};

const getOneJobDetails = async (req, res) => {
  const jobId = await req.params.id;
  const jobDetail = await JobPortal.findById(jobId);
  if (!jobDetail) {
    return res.status(403).json({ message: "invalid id..." });
  }
  const userDetail = await User.findById(jobDetail.userId);
  return res.status(201).json(jobDetail, userDetail);
};

export {createJobs,getAllJobsDetails,getOneJobDetails}