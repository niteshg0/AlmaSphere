import ContactMessage from "../model/contactMessage.js";
import User from "../model/User/userInfo.js";

export const submitContactMessage = async (req, res) => {
  try {
    

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: "Name, email, and message are required." 
      });
    }


    const contact = await ContactMessage.create({ 
      name, 
      email, 
      message
    });

    return res.status(201).json({ 
      message: "Your message has been received. Thank you for contacting us!",
      contact
    });

  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ 
      message: "Failed to submit message.", 
      error: error.message 
    });
  }
};