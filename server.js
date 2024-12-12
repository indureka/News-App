
import notificationRoutes from './src/server/routes/notificationRoutes.js';
import nodemailer from 'nodemailer'; 
import express from 'express';

import cors from 'cors';
import dotenv, { config } from 'dotenv';
import authRoutes from './src/server/routes/authRoute.js'
import sendEmail from './src/server/utils/sendEmail.js';

// import authRoutes from './routes/authRoute.js'; 

import path from 'path'; // To serve static files in production
import { connectDB } from './src/config.js';

// import connectDB from './src/config.js';


dotenv.config(); // Load environment variables from .env file

const app = express();

connectDB(); 

const corsOptions = {
  origin: process.env.FRONTEND_URL,  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods if needed
    credentials: true, 
  };

  app.use(cors(corsOptions));


// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware for CORS (Cross-Origin Resource Sharing) support


// Default route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the news app!');
  console.log('Root route working');
});

// Define authentication routes (can be extended for other routes)


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/notifications', notificationRoutes);

// Endpoint to send email notifications
// app.post('/send-notification', async (req, res) => {
//   const { email, subject, message } = req.body;

//   try {
//     await sendEmail(email, subject, message);
//     res.status(200).send({ message: 'Email sent successfully!' });
//   } catch (error) {
//     res.status(500).send({ error: 'Error sending email' });
//   }
// });



// app.use((req, res, next) => {
//   console.log(`Route not found: ${req.method} ${req.originalUrl}`);
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

// // MongoDB connection setup
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch(err => console.error("MongoDB connection error:", err));

// For production: Serve static files from React build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
