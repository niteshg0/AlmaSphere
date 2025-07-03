import connectUser from "../model/connectUserModel.js";
import User from "../model/User/userInfo.js";

const createConnection = async (req, res) => {
  try {
    const recieverUserId = req.params.id; // Fixed: removed destructuring from params
    const senderUserId = req.user._id;    // Fixed: removed destructuring from user

    if (senderUserId.toString() === recieverUserId.toString()) {
      return res.status(400).json({ message: "You can't connect with yourself" });
    }

    const [sender, receiver] = await Promise.all([
      User.findById(senderUserId),
      User.findById(recieverUserId)
    ]);

    if (!receiver) {
      return res.status(404).json({ message: "Receiver user not found" });
    }

    // Check if connection already exists
    if (sender.connections.includes(recieverUserId)) {
      return res.status(409).json({ message: "Connection already exists" });
    }

    // Check for pending request
    const existingConnection = await connectUser.findOne({
      $or: [
        { senderUserId, recieverUserId },
        { senderUserId: recieverUserId, recieverUserId: senderUserId }
      ],
      status: "pending"
    });

    if (existingConnection) {
      return res.status(409).json({ message: "Connection request already exists" });
    }

    const newConnection = await connectUser.create({
      senderUserId,
      recieverUserId,
      status: "pending"
    });

    return res.status(201).json(newConnection);
  } catch (error) {
    console.error("Connection error:", error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

const acceptConnection = async (req, res) => {
  try {
    const connectionId = req.params.connectionId; // Removed await
    const currentUserId = req.user._id;

    const connection = await connectUser.findOne({
      _id: connectionId,
      recieverUserId: currentUserId,
      status: "pending"
    });

    if (!connection) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    // Transaction would be better here
    const [updatedConnection] = await Promise.all([
      connectUser.findByIdAndUpdate(
        connectionId,
        { status: "accepted" },
        { new: true }
      ),
      User.findByIdAndUpdate(
        currentUserId,
        { $addToSet: { connections: connection.senderUserId } }
      ),
      User.findByIdAndUpdate(
        connection.senderUserId,
        { $addToSet: { connections: currentUserId } }
      )
    ]);

    return res.status(200).json({
      message: "Connection accepted"
    });
  } catch (error) {
    console.error("Accept connection error:", error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

const rejectConnection = async (req, res) => {
  try {
    const connectionId = req.params.connectionId;
    const currentUserId = req.user._id;

    const connection = await connectUser.findOneAndUpdate(
      {
        _id: connectionId,
        recieverUserId: currentUserId,
        status: "pending"
      },
      { status: "rejected" },
      { new: true }
    );

    if (!connection) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    return res.status(200).json({
      message: "Connection rejected",
      connection
    });
  } catch (error) {
    console.error("Reject connection error:", error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

const getAllConnection = async (req, res) => {
  // const userId = await req.params.userId;
  // try {
  //   const allConnection = await connectUser
  //     .find({
  //       $or: [{ senderUserId: userId }, { recieverUserId: userId }],
  //       status: "accept",
  //     })
  //     .populate("senderUserId recieverUserId", "fullName email");

  //   return res.status(202).json(allConnection);
  // } catch (error) {
  //   return res.status(500).json({ error: error.message });
  // }
};

const getConnectionStatus = async (req, res) => {
  try {
    const targetId = req.params.userId;
    const currentUserId = req.user._id;

    if (currentUserId.toString() === targetId.toString()) {
      return res.status(400).json({ message: "Cannot check connection with yourself" });
    }

    const [currentUser, targetUser] = await Promise.all([
      User.findById(currentUserId),
      User.findById(targetId)
    ]);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already connected
    if (currentUser.connections.includes(targetId)) {
      return res.json({ status: "connected" });
    }

    // Check for pending requests
    const pendingRequest = await connectUser.findOne({
      $or: [
        { senderUserId: currentUserId, recieverUserId: targetId },
        { senderUserId: targetId, recieverUserId: currentUserId }
      ],
      status: "pending"
    });

    if (pendingRequest) {
      return res.json({ 
        status: pendingRequest.senderUserId.equals(currentUserId) ? "pending" : "received"
      });
    }

    return res.json({ status: "connect" });
  } catch (error) {
    console.error("Get connection status error:", error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

const removeConnection = async (req, res) => {
  try {
    const myId = req.user._id;
    const otherId = req.params.userId;

    await Promise.all([
      User.findByIdAndUpdate(myId, { $pull: { connections: otherId } }),
      User.findByIdAndUpdate(otherId, { $pull: { connections: myId } }),
      connectUser.deleteMany({
        $or: [
          { senderUserId: myId, recieverUserId: otherId },
          { senderUserId: otherId, recieverUserId: myId }
        ]
      })
    ]);

    return res.status(200).json({ message: "Connection removed successfully" });
  } catch (error) {
    console.error("Remove connection error:", error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};


const getConnectionRequest = async (req, res) => { // Fixed parameter name (was res, res)
  try {
    const userId = req.user._id;
    
    const requests = await connectUser
      .find({ 
        recieverUserId: userId, 
        status: "pending" 
      })
      .populate("senderUserId", "fullName rollNumber role _id profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    console.error("Get connection requests error:", error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

const getUserConnection = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate({
        path: "connections",
        select: "fullName rollNumber role profilePicture",
        options: { sort: { fullName: 1 } }
      });

    return res.status(200).json(user.connections);
  } catch (error) {
    console.error("Get user connections error:", error);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (!users) {
//       return res.status(402).json({ message: "some error happens" });
//     }

//     return res.status(202).json(users);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err.message });
//   }
};

export {
  createConnection,
  acceptConnection,
  rejectConnection,
  getAllConnection,
  getAllUsers,
  getConnectionStatus,
  removeConnection,
  getConnectionRequest,
  getUserConnection
};
