import JobPortal from "../model/jobPortalModel.js";
import AnalyticsInfo from "../model/User/analyticsInfo.js";
import User from "../model/User/userInfo.js";
// import User from "../model/User/userInfo.js";

const createJobs = async (req, res) => {
  const userId = await req.user?._id;
  if (!userId) {
    return res.status(402).json({ message: "Not Authorize to create job.." });
  }
  const {
    title,
    description,
    companyName,
    application_deadline,
    applyLink,
    job_type,
    createdAt,
    salary,
    contact_email,
    contact_phone,
    requirements,
    location,
    yearOfExperience,
  } = req.body;
  if (
    !title ||
    !description ||
    !companyName ||
    !applyLink ||
    !application_deadline ||
    !job_type ||
    !salary ||
    !contact_email ||
    !contact_phone ||
    !requirements ||
    !location ||
    !yearOfExperience
  ) {
    return res.status(402).json({ message: "all fields are required...." });
  }
  const jobDetail = new JobPortal({
    userId,
    title,
    description,
    companyName,
    application_deadline,
    applyLink,
    createdAt,
    job_type,
    salary,
    contact_email,
    contact_phone,
    location,
    requirements,
    yearOfExperience,
  });

  try {
    const saveDetails = await jobDetail.save();

    if (saveDetails) {
      const user = await User.findById(userId);

      const analytics = await AnalyticsInfo.findOneAndUpdate(
        { userId: userId },
        { $inc: { jobPosted: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      if (!user.analyticsId) {
        user.analyticsId = analytics._id;
        await user.save();
      }
    }

    

    return res.status(202).json({
      id: saveDetails._id,
      userId: saveDetails.userId,
      title: saveDetails.title,
      description: saveDetails.description,
      companyName: saveDetails.companyName,
      application_deadline: saveDetails.application_deadline,
      applyLink: saveDetails.applyLink,
      createdAt: saveDetails.createdAt,
      job_type: saveDetails.job_type,
      salary: saveDetails.salary,
      contact_email: saveDetails.contact_email,
      contact_phone: saveDetails.contact_phone,
      requirements: saveDetails.requirements,
      location: saveDetails.location,
      yearOfExperience: saveDetails.yearOfExperience,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server issue..." });
  }
};

const getAllJobsDetails = async (req, res) => {
  try {
    const allJobDetails = await JobPortal.find({}).populate(
      "userId",
      "fullName -_id"
    ).sort({ createdAt: -1 }); // Sort by date descending (newest first);

    // Return the job details
    res.status(200).json(allJobDetails);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching job details:", error);

    res.status(500).json({ message: error.message });
  }
};

const getOneJobDetails = async (req, res) => {
  const jobId = await req.params.id;
  const jobDetail = await JobPortal.findById(jobId).populate(
    "userId",
    "fullName email rollNumber -_id"
  );
  if (!jobDetail) {
    return res.status(403).json({ message: "invalid id..." });
  }
  return res.status(201).json(jobDetail);
};

export { createJobs, getAllJobsDetails, getOneJobDetails };
