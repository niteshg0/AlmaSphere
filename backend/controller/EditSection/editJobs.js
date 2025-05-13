import JobInfo from "../../model/User/jobInfo.js";

const editJobInfo = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Please login..." });
    }

    const job = await JobInfo.findOne({ userId });
    if (!job) {
      return res.status(404).json({ message: "Job info not found..." });
    }

    const previous = {
      companyName: job.companyName,
      position: job.position,
      duration: job.duration,
    };

    // Safely push to previousCompany
    job.previousCompany = job.previousCompany || [];
    job.previousCompany.push(previous);

    const { companyName, position, duration, location } = req.body;

    if (companyName) job.companyName = companyName;
    if (position) job.position = position;
    if (duration) job.duration = duration;
    if (location) job.location = location;

    await job.save();

    return res.status(200).json({ job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error..." });
  }
};

export { editJobInfo };
