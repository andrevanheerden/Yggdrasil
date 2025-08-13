const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multer'); // You'll need to set up multer for file uploads

router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protected routes
router.use(authMiddleware.authenticateToken);

router.get('/profile', userController.getProfile);
router.post('/profile/image', upload.single('image'), userController.updateProfileImage);
router.post('/assign-campaign', userController.assignCampaign);

// Admin only routes
router.use(authMiddleware.authorizeRoles('admin', 'dm'));

// Add admin routes here

module.exports = router;