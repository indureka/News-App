
import User from "../models/User.js";

import sendEmail from "../utils/sendEmail.js";
import { sendNewsAlert } from "../utils/sendEmail.js";

// Controller for subscribing to categories
const subscribeToCategories = async (req, res) => {
  const { email, categories } = req.body;

  if (!email || !categories || categories.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  try {
    // Save subscription details to the database
    await User.updateOne(
      { email },
      { $set: { categories, subscribed: true } },
      { upsert: true }
    );

    // Send initial news alert email
    await sendEmail(
      email,
      "Preference Updated and Subscription Activated",
      `You have successfully subscribed to the following categories: ${categories.join(", ")}`
    );

    res.status(200).json({ success: true, message: "Preference Updated and Subscription Activated" });
  } catch (error) {
    console.error("Error activating subscription:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


 const processNewsAlerts = async (req, res) => {

    
    const { user, newsUpdates } = req.body;

    console.log(req.body); 


    if (!newsUpdates || newsUpdates.length === 0) {
    // if (!newsUpdates || !Array.isArray(newsUpdates)) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }
  
    try {

        console.log('Incoming Request Body:', req.body);


    //     // Access the user and newsUpdates from the request body
    // const { user, newsUpdates } = req.body;

    if (!user || !user.email) {
      console.error('Error: No email provided for user');
      return res.status(400).json({ success: false, error: 'No email provided' });
    }

          // Assuming sendNewsAlert is being imported correctly
    const result = await sendNewsAlert(user, newsUpdates);
    res.status(200).json(result);
    }

    catch (error) {
      console.error('Error processing news alerts:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };


  export {
    subscribeToCategories,
    processNewsAlerts,
  };