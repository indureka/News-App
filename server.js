
import notificationRoutes from './src/server/routes/notificationRoutes.js';

import express from 'express';

import cors from 'cors';
import dotenv, { config } from 'dotenv';





import { connectDB } from './src/config.js';




dotenv.config(); // Load environment variables from .env file

const app = express();

connectDB(); 

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Set your local dev URL or frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Allow credentials if needed
};

  app.use(cors(corsOptions));


  app.options('*', cors(corsOptions)); // Preflight requests handler


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




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
