import User from "../../model/User/userInfo.js";

const searchUsers = async (req, res) => {
  try {
    const { query } = req.body; // Changed from req.query to req.body

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Determine if query is numeric (rollNumber) or string (username)
    const isRollNumber = !isNaN(query);
    
    const searchQuery = isRollNumber 
      ? { rollNumber: parseInt(query) } // Exact match for numbers
      : { 
          fullName: { 
            $regex: query, 
            $options: 'i' // Case-insensitive
          } 
        };

    const users = await User.find(searchQuery)
      .collation({ locale: 'en', strength: 2 })
      .select('-password -verifyCode -codeExpiry') // Exclude sensitive fields
      .limit(20) // Limit results
      .lean();

    return res.status(200).json({
      users
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      message: 'Server error during search',
    });
  }
};

export { searchUsers };