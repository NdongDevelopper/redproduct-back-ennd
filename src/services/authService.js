require('dotenv').config(); 
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("./email.service");

// --- FONCTION MOT DE PASSE OUBLIÉ ---
exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Utilisateur non trouvé");

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 heure
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/motdepasse.html?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Réinitialisation de mot de passe",
    html: `
      <h2>Réinitialisation de votre mot de passe</h2>
      <p>Cliquez sur le lien ci-dessous pour changer votre mot de passe :</p>
      <a href="${resetLink}">Réinitialiser mon mot de passe</a>
    `
  });

  return { success: true, message: "Email envoyé avec succès" };
};

// --- FONCTION RÉINITIALISATION ---
exports.resetPassword = async (token, password) => {
  console.log('🔑 Token reçu:', token);

  const userByToken = await User.findOne({ resetPasswordToken: token });
  console.log('👤 User trouvé par token:', userByToken ? userByToken.email : 'AUCUN');

  if (userByToken) {
    console.log('⏳ Expire le:', new Date(userByToken.resetPasswordExpires));
    console.log('🕐 Maintenant:', new Date());
    console.log('✅ Encore valide:', userByToken.resetPasswordExpires > Date.now());
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error("Le jeton est invalide ou a expiré.");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { success: true, message: "Mot de passe modifié avec succès" };
};