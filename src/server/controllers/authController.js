import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateResetToken } from '../utils/tokenUtils.js';

// import { generateResetToken } from '../utils/tokenUtils.js';  // Function to generate the reset token
// import { validateEmail, validatePassword, validateNotEmpty } from '../utils/validate.js';
// import { validateEmail, validatePassword, validateNotEmpty } from '../utils/validate.js';
// import { PASSWORD_RESET_SUBJECT, FRONTEND_URL } from '../utils/constants.js';

import { ssrExportAllKey } from 'vite/module-runner';

import constants from '../utils/constants.js';

const { PASSWORD_RESET_SUBJECT, FRONTEND_URL } = constants;

import validate from '../utils/validate.js'

const { validateEmail, validatePassword, validateNotEmpty } = validate;




// Request password reset
// const requestPasswordReset = async (req, res) => {
//   console.log('Request body:', req.body); // Log incoming request body
//   const { email } = req.body;

//   if (!validateEmail(email)) {
//     console.log('Invalid email format');
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   try {
//     console.log('Generating reset token...');
//     const resetToken = generateResetToken(email);

//     const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
//     console.log('Sending email to:', email, 'with link:', resetLink);

//     await sendPasswordResetEmail(
//       email,
//       PASSWORD_RESET_SUBJECT,
//       'Click the link to reset your password',
//       `<a href="${resetLink}">Reset Password</a>`
//     );

//     console.log('Email sent successfully');
//     res.status(200).json({ message: 'Password reset email sent' });
//   } catch (error) {
//     console.error('Error in requestPasswordReset:', error);
//     res.status(500).json({ message: 'Failed to send reset email' });
//   }
// };





// const requestPasswordReset = async (req, res) => {
//   console.log('Request body:', req.body); // Log incoming request body
//   const { email } = req.body;

//   if (!validateEmail(email)) {
//     console.log('Invalid email format');
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   try {
//     console.log('Generating reset token...');
//     const resetToken = generateResetToken(email);  // This will generate the JWT token

//     // Instead of sending the reset link in the email, send the reset token directly
//     console.log('Sending reset token to email:', email);

//     // Send the token in the response for testing purposes (you can remove this after testing)
//     res.status(200).json({
//       message: 'Password reset email sent',
//       resetToken: resetToken  // Send the token directly in the response
//     });

//     // If you want to send the email as well (optional for testing)
//     const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
//     await sendPasswordResetEmail(
//       email,
//       PASSWORD_RESET_SUBJECT,
//       'Click the link to reset your password',
//       `<a href="${resetLink}">Reset Password</a>`
//     );
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error in requestPasswordReset:', error);
//     res.status(500).json({ message: 'Failed to send reset email' });
//   }
// };



// Login




// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password input
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validateNotEmpty(password)) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password); // Assuming `matchPassword` is defined in User schema
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token for authenticated user
    const token = user.generateAuthToken(); // Assuming `generateAuthToken` is defined in User schema

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




// const login = async (req, res) => {
//   const { email, password } = req.body;

//   // Validate email and password input
//   if (!validateEmail(email)) {
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   if (!validateNotEmpty(password)) {
//     return res.status(400).json({ message: 'Password is required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Generate token for authenticated user
//     const token = user.generateAuthToken();

//     res.status(200).json({
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // Signup



// Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate email and password format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters, including one number and one letter' });
  }

  // Ensure name is not empty
  if (!validateNotEmpty(name)) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};





// const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   // Validate email and password format
//   if (!validateEmail(email)) {
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   if (!validatePassword(password)) {
//     return res.status(400).json({ message: 'Password must be at least 8 characters, including one number and one letter' });
//   }

//   // Ensure name is not empty
//   if (!validateNotEmpty(name)) {
//     return res.status(400).json({ message: 'Name is required' });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     // Create new user
//     const user = new User({ name, email, password });
//     await user.save();

//     res.status(201).json({ message: "User created successfully", user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Function to reset the password (new function to be added)
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!newPassword || newPassword.trim().length === 0) {
    return res.status(400).json({ message: 'New password is required' });
  }

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by email (decoded from the token)
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token or user not found' });
    }

    // Hash the new password before saving
    user.password = await bcrypt.hash(newPassword, 10);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

export default { login, signup, resetPassword };
