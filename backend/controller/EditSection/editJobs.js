import JobInfo from "../../model/User/jobInfo.js";

const editJobInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(402).json({ message: "please login..." });
    }
    const job = await JobInfo.findOne({ userId });
    if (!job) {
      return res.status(403).json({ message: "jobinfo not founded..." });
    }

    const previous = {
      companyName: job.companyName,
      position: job.position,
      duration: job.duration,
    };
    job.previousCompany.push(previous);

    const { companyName, position, duration, location } = req.body;
    if (companyName) {
      job.companyName = companyName;
    }
    if (position) {
      job.position = position;
    }
    if (duration) {
      job.duration = duration;
    }
    if (location) {
      job.location = location;
    }

    await job.save();
    return res.status(202).json({ message: "jobInfo added successfully", job });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "server error..." });
  }
};

export {editJobInfo}