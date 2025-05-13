// import College_data from "../model/College_data"

import College_data from "../model/College_data.js";

const getCollege_data= async (req, res)=>{
    try {
        const all_data= await College_data.find({}).sort({ createdAt: -1 });

        if(!all_data){
            return res.status(400).json({
                message: "Cannot Fetch College data",
                data: {}
            })
        }

        return res.status(200).json({
                message: "All data Provided By College",
                data: all_data
        })
    } catch (error) {
        return res.status(400).json({
            message: "Internal Error in College_data get ",
            data: {}
        })
    }
}
const postCollege_data = async (req, res) => {
    try {
        // Remove () from req.body
        const {fullName, rollNumber, email, gender, course, branch, cgpa, batch} = req.body;

        // Validate required fields
        if (!fullName || !rollNumber || !email || !gender || !course || !branch || !cgpa || !batch) {
            return res.status(400).json({
                message: "All fields are required",
                data: {}
            });
        }

        const existUser = await College_data.findOne({ rollNumber });

        if (existUser) {

            if(existUser?.isVerified){
                return res.status(400).json({
                    message: "User has Registered, Cannot Update"
                })
            }
            const updated = await College_data.findOneAndUpdate(
                { email },
                { fullName, rollNumber, email, gender, course, branch, cgpa, batch },
                { new: true }
            );

            if (updated) {
                return res.status(200).json({
                    message: "Updated the Data",
                    data: updated
                });
            } else {
                return res.status(400).json({
                    message: "Could not update",
                    data: {}
                });
            }
        } 

        // Changed variable name from res to result to avoid conflict
        const result = await College_data.create({
            fullName, 
            rollNumber, 
            email, 
            gender, 
            course, 
            branch, 
            cgpa, 
            batch
        });

        if (!result) {
            return res.status(400).json({
                message: "Could not store data",
                data: {}
            });
        }

        return res.status(201).json({
            message: "Stored the data successfully",
            data: result
        });

    } catch (error) {
        console.error("College data post error:", error); // Add error logging
        return res.status(500).json({
            message: "Internal Error in College_data post",
            error: error.message,
            data: {}
        });
    }
};

export {
    getCollege_data, 
    postCollege_data
};