// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

// Routes
const userRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const messageRoutes = require("./routes/messageRoutes");
const inviteRoutes = require('./routes/inviteRoutes');
const encounterRoutes = require("./routes/encounterRoutes");
const encounterInventoryRoutes = require("./routes/encounterInventoryRoutes");
const encounterSpellsRoutes = require("./routes/encounterSpellsRoutes");
const encounterActionsRoutes = require("./routes/encounterActionsRoutes");
const characterRoutes = require("./routes/characterRoutes");
const characterBackgroundRoutes = require("./routes/characterBackgroundRoutes");

const characterRaceRoutes = require("./routes/characterRaceRoutes");
const characterClassRoutes = require("./routes/characterClassRoutes");
const characterInventoryRoutes = require("./routes/characterInventoryRoutes");
const characterSpellsRoutes = require("./routes/characterSpellsRoutes");
const characterActionsRoutes = require("./routes/characterActionsRoutes");
const dmNoteRoutes = require("./routes/dmNoteRoutes");
const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '/tmp/'), // safer cross-platform path
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/invites', inviteRoutes);
app.use("/api/encounters", encounterRoutes);
app.use("/api/encounter-inventory", encounterInventoryRoutes); // moved above 404
app.use("/api/encounter-spells", encounterSpellsRoutes);
app.use("/api/encounter-actions", encounterActionsRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/character-backgrounds", characterBackgroundRoutes);
app.use("/api/character-races", characterRaceRoutes);
app.use("/api/character-classes", characterClassRoutes);
app.use("/api/character-inventory", characterInventoryRoutes); 
app.use("/api/character-spells", characterSpellsRoutes);
app.use("/api/character-actions", characterActionsRoutes);
app.use("/api/dm-notes", dmNoteRoutes);



// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// 404 handler (must be after all other routes)
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
