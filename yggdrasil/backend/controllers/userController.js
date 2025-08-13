const userModel = require('../models/userModel');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/auth');
const jwt = require('jsonwebtoken');

module.exports = {
  async signup(req, res) {
    const { name, email, password, confirmPassword, role } = req.body;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    
    try {
      // Check if user exists
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Create user
      const user = await userModel.create({
        name,
        email,
        password,
        role: role || 'player'
      });

      // Generate token
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileimg: user.profileimg
        },
        token
      });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    try {
      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileimg: user.profileimg,
          campaign_id: user.campaign_id
        },
        token
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error('Profile error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateProfileImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
      }
      
      const imagePath = `/uploads/${req.file.filename}`;
      const user = await userModel.updateProfileImage(req.user.id, imagePath);
      
      res.json({
        message: 'Profile image updated successfully',
        user
      });
    } catch (err) {
      console.error('Profile image error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async assignCampaign(req, res) {
    const { campaignId } = req.body;
    
    try {
      const user = await userModel.assignToCampaign(req.user.id, campaignId);
      res.json({
        message: 'Campaign assigned successfully',
        user
      });
    } catch (err) {
      console.error('Campaign assignment error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};