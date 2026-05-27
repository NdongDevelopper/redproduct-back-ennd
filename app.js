const dotenv = require('dotenv');
dotenv.config(); // ✅ EN TOUT PREMIER, avant tout le reste

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');

const app = express();

// Connexion DB
connectDB();

// Middlewares

app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://red-product-final.netlify.app' // 
  ]
}));
app.use(express.json({ limit: '10mb' }));        
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/hotels', require('./src/routes/hotelRoutes'));
app.use('/api/dashboard', require('./src/routes/dashboardRoutes'));

// Route d'accueil
app.get('/', (req, res) => {
  res.json({ message: 'API Hôtels - Bienvenue' });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);

  if (!process.env.JWT_SECRET) {
    console.log("⚠️ Attention: JWT_SECRET n'est pas défini dans le fichier .env");
  } else {
    console.log("✅ Configuration JWT prête.");
  }
});

module.exports = app;