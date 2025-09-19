require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Example test POST inside campaigns (move before 404)
app.post('/api/campaigns/test', (req, res) => {
  console.log('Test route hit!', req.body);
  res.json({ message: 'Route works!' });
});

// 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
