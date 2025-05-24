import connectUser from "../model/connectUserModel.js";
import User from "../model/User/userInfo.js";

const createConnection = async (req, res) => {
  try {
    const { senderUserId, recieverUserId } = req.body;

    if (senderUserId == recieverUserId) {
      return res
        .status(401)
        .json({ message: "you can't create connection with yourself" });
    }

    // cheaking the connection is already created or not

    const alreadyCreatedConnection = await connectUser.findOne({
      // $or bitwise or operation
      // two condition for either a send request to b
      // b send request to a
      $or: [
        { senderUserId, recieverUserId },
        { senderUserId: recieverUserId, recieverUserId: senderUserId },
      ],
    });

    if (alreadyCreatedConnection) {
      return res.status(401).json({ message: "connection already exist" });
    }

    const newConnection = new connectUser({
      senderUserId,
      recieverUserId,
    });

    const savedConnection = await newConnection.save();
    const recieverDetail = await User.findById(recieverUserId);
    return res.status(201).json({
      message: "connection request send!...",
      setTo: recieverDetail.fullName,
    });
  } catch (error) {
    console.log("message : ", error.message || error);
    return res.status(501).json({ message: "server error occure!..." });
  }
};

const acceptConnection = async (req, res) => {
  const connectionId = await req.params.id;
  if (!connectionId) {
    return res.status(401).json({ message: "not login..." });
  }
  try {
    const connection = await connectUser.findByIdAndUpdate(
      connectionId,
      { status: "accept" },
      { new: true }
    );
    // using new : true to return the updated version of schema
    return res
      .status(202)
      .json({ message: "connection created!....", connection });
  } catch (error) {
    console.log("message : ", error.message || error);
    return res.status(501).json({ message: "server error occure!..." });
  }
};

const rejectConnection = async (req, res) => {
  const connectionId = await req.params;
  if (!connectionId) {
    return res.status(401).json({ message: "not login..." });
  }
  try {
    const connection = await connectUser.findByIdAndUpdate(
      connectionId,
      { status: "reject" },
      { new: true }
    );
    return res
      .status(202)
      .json({ message: "connection rejected!....", connection });
  } catch (error) {
    console.log("message : ", error.message || error);
    return res.status(501).json({ message: "server error occure!..." });
  }
};

const getAllConnection = async (req, res) => {
  const userId = await req.params.userId;
  try {
    const allConnection = await connectUser
      .find({
        $or: [{ senderUserId: userId }, { recieverUserId: userId }],
        status: "accept",
      })
      .populate("senderUserId recieverUserId", "fullName email");

    return res.status(202).json(allConnection);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllUsers = async (req,res) => {
  try{
    const users = await User.find({})
    if(!users){
      return res.status(402).json({message:"some error happens"})
    }

    return res.status(202).json(users)
  }catch(err){
    console.log(err)
    return res.status(500).json({message:err.message})
  }
}


export {
  createConnection,
  acceptConnection,
  rejectConnection,
  getAllConnection,
  getAllUsers
};
