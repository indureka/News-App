import express from 'express';
import authController from '../controllers/authController.js';
const { login, signup, resetPassword } = authController;

// import { login, signup } from '../controllers/authController.js'; // Adjust path if needed
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);




router.post('/request-reset', (req, res, next) => {
    console.log('Route hit: /request-reset');
    next();
  }, resetPassword);





export default router;

