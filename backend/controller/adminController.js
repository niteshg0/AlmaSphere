import User from "../model/User/userInfo.js";

const getAllUser = async (req, res) => {
  try {
    const getAllUsers = await User.find({});
    res.status(202).json(getAllUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "server error..." });
  }
};

// const addDetail= async (req, res)=>{
//     try {
      
//     } catch (error) {
      
//     }
// }

export { getAllUser };
