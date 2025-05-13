// import College_data from "../model/College_data"

import College_data from "../model/College_data.js";

const getCollege_data= async (req, res)=>{
    try {
        const all_data= await College_data.find({});

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
const postCollege_data= async (req, res)=>{
    try {
        const {fullName, rollNumber, email, gender, course, branch, cgpa, batch}= req.body();

        const existUser = await College_data.findOne({ email });

        if (existUser) {
            const updated = await College_data.findOneAndUpdate(
                { email },
                { fullName, rollNumber, email, gender, course, branch, cgpa, batch },
                { new: true } // returns updated document
            );

                if (updated) {
                    return res.json({
                    message: "Updated the Data",
                    data: updated,
                    });
                } else {
                    return res.status(400).json({
                    message: "Could not update",
                    data: {},
                    })
                }
        } 


        const res= await College_data.create({
            fullName, rollNumber, email, gender, course, branch, cgpa, batch
        })

        if(!res){
            return res.status(400).json({message: "Could Not store/ format may not be Correct",
                data: {}
        })
        }

        return res.status(200).json({
            message: "Stored the data successfully",
            data: {}
        })

    } catch (error) {
        return res.status(400).json({
            message: "Internal Error in College_data post",
            data: {}
        })
    }
}

export {
    getCollege_data, 
    postCollege_data
};