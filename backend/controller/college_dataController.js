import xlsx from "xlsx";
import fs from "fs";
import path from "path";

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

const upload_Excel= async (req, res)=>{
    try {
        if(!req.file){
            return res.status(400).json({ message: "No file uploaded" });
        }

        const ext= path.extname(req.file.originalname);

        if (![".xlsx", ".xls"].includes(ext)) {
            return res.status(400).json({ message: "Only Excel files are allowed" });
        }

        //Read Excel File
        const workbook= xlsx.readFile(req.file.path);
        const sheetName= workbook.SheetNames[0];
        const sheet= workbook.Sheets[sheetName];
        const jsonData= xlsx.utils.sheet_to_json(sheet, {defval: ""});

        if(jsonData.length===0){
            return res.status(400).json({ message: "Excel file is empty" });
        }

        const existingData= await  College_data.find({}, {email: 1, rollNumber: 1});

        const existingEmail= new Set(existingData.map((rec)=> rec.email));

        const existingRoll= new Set(existingData.map((rec)=> rec.rollNumber));


        const valid_Data= [];
        const duplicates= [];
        const errors= [];  
        
        const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const ROLL_NUMBER_REGEX = /^[0-9]{10,15}$/  // Assuming 10-digit roll number
        // const NAME_REGEX = /^[A-Za-z\s]{2,50}$/;  // 2-50 chars, letters and spaces only
        const CGPA_REGEX = /^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?)$/; // 0-10 with up to 2 decimal places
        const BATCH_REGEX = /^\d{4}-\d{4}$/; // Format: YYYY-YYYY

        jsonData.forEach((row, index)=>{

            const {fullName, rollNumber, email, gender, course, branch, cgpa, batch}= row;

            if (!fullName.trim() || !email || !rollNumber || !gender.trim() || !batch || !course.trim() || !branch.trim() || !cgpa) {
                errors.push({ row: index + 2, fullName, rollNumber, email, gender, course, branch, cgpa, batch });
            }

            else if(!EMAIL_REGEX.test(email) || !ROLL_NUMBER_REGEX.test(rollNumber.toString()) || !CGPA_REGEX.test(cgpa.toString()) || !BATCH_REGEX.test(batch) || !['Male', 'Female', 'Other'].includes(gender)){
                 errors.push({ row: index + 2, fullName, rollNumber, email, gender, course, branch, cgpa, batch });
            }

            else if(existingEmail.has(email) || existingRoll.has(rollNumber)){
                duplicates.push({ row: index + 2, fullName, rollNumber, email, gender, course, branch, cgpa, batch });
            }

            else {
                valid_Data.push({ fullName, rollNumber, email, gender, course, branch, cgpa, batch});
                existingEmail.add(email); // Avoid future row duplicates
                existingRoll.add(rollNumber);
            }
        });

        const inserted= await College_data.insertMany(valid_Data);

        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: "Upload complete",
            insertedCount: inserted.length,
            duplicateCount: duplicates.length,
            errorCount: errors.length,
            duplicates,
            errors,
        });


    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
}

export {
    getCollege_data, 
    postCollege_data,
    upload_Excel
};