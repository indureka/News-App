import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Set up your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or another email service like Yahoo, Outlook, etc.
    auth: {
      user: process.env.EMAIL_USER,// Replace with your email
      pass: process.env.EMAIL_PASS,  // Replace with your email password or an app password
    }
  });
  
  // Function to send email
  const sendEmail = async (to, subject, text) => {

    if (!to) {
      console.error('No email provided!');
      return;
    }

    console.log('Preparing to send email:');
    console.log('Email subject:', subject);
    console.log('Email text:', text);

    const mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: to,                       // recipient's email
      subject: subject,             // subject line
      text: text                    // email body
    };
  
    try {
    //   await transporter.sendMail(mailOptions);
    const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    //   console.log('Email sent successfully');
      return { success: true }; 
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  // Main function to send notifications based on user preferences
export const sendNotification = async (user, message) => {
  console.log('Sending notification to user:', user);

  if (!user.email) {
    console.error('Error: No email provided!');
    return { success: false, error: 'No email provided' };
  }
    console.log('Sending notification to user:', user);
    if (user.notificationChannels.includes('email')) {
        console.log('Email channel selected, sending email...');
      await sendEmail(user.email, 'Notification', message);
    }
  
    // if (user.notificationChannels.includes('sms')) {
    //   await sendSms(user.phoneNumber, message);
    // }
  
    // if (user.notificationChannels.includes('push')) {
    //   await sendPushNotification(user.deviceToken, message);
    // }
  };


  

  export const sendNewsAlert = async (user, newsUpdates) => {
    console.log('Sending news alert to user:', user);

    console.log('sendNewsAlert called with:', { user, newsUpdates });
    if (!user || !user.email) {
      console.error('Error: No email provided for user:', user);
      return { success: false, error: 'No email provided' };
    }

    if (!Array.isArray(newsUpdates)) {
      console.error('newsUpdates is not an array:', newsUpdates);
      throw new TypeError('newsUpdates must be an array');
    }

     // Check the user categories structure
  console.log('User subscribed categories:', user.categories);
    
  // Filter news updates for user's subscribed categories
  const relevantUpdates = newsUpdates.filter(update => {
    console.log(`Checking if ${update.category} is in ${user.categories}`);
    return user.categories.includes(update.category);
  });
  console.log('Relevant updates for user:', relevantUpdates); 


    // Filter news updates for user's subscribed categories
    // const relevantUpdates = newsUpdates.filter(update => user.categories.includes(update.category));
    // console.log('Relevant updates for user:', relevantUpdates); 
  
    if (relevantUpdates.length === 0) {
      console.log('No relevant news updates for user:');
      return { success: false, message: 'No relevant updates' };
    }
  
    // Prepare email content
    const emailContent = relevantUpdates
      .map(update => `- ${update.title}: ${update.description  || 'No description available'}`)
      .join('\n');
  
    if (user.notificationChannels.includes('email')) {
      console.log('Sending email with news alerts:');
      await sendEmail(
        user.email,
        'Your News Alerts',
        `Here are the latest updates in your subscribed categories:\n\n${emailContent}`
      );
    }
  
    return { success: true, message: 'News alert sent successfully' };
  };


export default sendEmail;