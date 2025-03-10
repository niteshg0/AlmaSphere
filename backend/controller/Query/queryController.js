import { Question } from "../../model/Query/questionModel.js";

const showAllQuery= async (req, res)=> {
	try {
        const response= await Question.find({});
        console.log(response);
        
        if(response.length==0){
            res.status(500).json({
                message: "There is no query"
            })
        }

        res.status(200).json(response);
           
    } catch (error) {
        res.status(500).json({
            message: "Error in ShowAllQuery",
            error: error.message
        });
    }
}

export {showAllQuery};