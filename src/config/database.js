const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔍 URI MongoDB:', process.env.MONGODB_URI); // ← ligne 4
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connecté avec succès');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;