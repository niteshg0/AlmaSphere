import { MemoryForm } from "../model/MemoryFormModel.js";

const PostPhotoes = async (req, res) => {
    try {
        const { title, tags, GallaryImages, description } = req.body;

        if (!title || !GallaryImages || !tags || !description) {
            return res.status(400).json({ message: "Please Provide necessary Fields" });
        }
        const checkTitle = title.trim();
        const existingTitle = await MemoryForm.findOne({ title: checkTitle });

        if (existingTitle) {
            return res.status(400).json({ message: "Title already Exist" });
        }
        const newMemory = new MemoryForm({
            PostedBy: req.user?._id || null,
            title,
            tags,
            GallaryImages,
            description
        })

        await newMemory.save();

        res.status(200).json({
            message: "Memory is Created Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error in CreatingMemories",
            error: error.message
        });
    }
}

const showAllPhotoes = async (req, res) => {
    try {
        
    const { id } = req.params;
    console.log(id);

    const memories = await MemoryForm.find({ tags: Number(id) }).populate("PostedBy", "fullName email"); // filter by tag and populate

    res.status(200).json({
      message: `Images with tag "${id}"`,
      count: memories.length,
      data: memories,
    });
  
        // const { id } = req.params;
        // console.log(id);

        // const images = await MemoryForm.find();
        // const memories = await MemoryForm.find().populate("PostedBy", "name email"); // 👈 only populate name/email


        // res.status(200).json({
        //     message: `Images with tag "${id}"`,
        //     count: images.length,
        //     data: images
        // });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch images by tag",
            error: error.message
        });
    }
}

const upvoteImage = async (req, res) => {
    try {
        const { photoid } = req.params;
        const userId = req.user?._id || "demoUser";

        const image = await MemoryForm.findById(photoid);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Remove from downvotes if exists
        image.downvotes = image.downvotes.filter(id => id.toString() !== userId.toString());

        const alreadyUpvoted = image.upvotes.includes(userId);

        if (alreadyUpvoted) {
            image.upvotes = image.upvotes.filter(id => id.toString() !== userId.toString());
        } else {
            image.upvotes.push(userId);
        }

        await image.save();

        res.status(200).json({
            message: "Upvote updated successfully",
            upvotes: image.upvotes.length,
            downvotes: image.downvotes.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating upvote",
            error: error.message
        });
    }
};


const downvoteImage = async (req, res) => {
    try {
        const { photoid } = req.params;
        const userId = req.user?._id || "demoUser";

        const image = await MemoryForm.findById(photoid);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Remove from upvotes if exists
        image.upvotes = image.upvotes.filter(id => id.toString() !== userId.toString());

        const alreadyDownvoted = image.downvotes.includes(userId);

        if (alreadyDownvoted) {
            image.downvotes = image.downvotes.filter(id => id.toString() !== userId.toString());
        } else {
            image.downvotes.push(userId);
        }

        await image.save();

        res.status(200).json({
            message: "Downvote updated successfully",
            upvotes: image.upvotes.length,
            downvotes: image.downvotes.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating downvote",
            error: error.message
        });
    }
};

const getAllMemories = async (req, res) => {
    try {
            const memories = await MemoryForm.find().populate("PostedBy", "fullName email").sort({createdAt :-1}); // filter by tag and populate
        res.status(200).json(memories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch memories", error: error.message });
    }
};

export { showAllPhotoes, PostPhotoes, upvoteImage, downvoteImage, getAllMemories };