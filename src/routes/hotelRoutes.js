// src/routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary'); // ← ajouter
const {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/hotelController');

router.route('/')
  .get(getHotels)
  .post(protect, upload.single('photo'), createHotel); // ← ajouter upload.single('photo')

router.route('/:id')
  .get(getHotelById)
  .put(protect, upload.single('photo'), updateHotel)   // ← ajouter upload.single('photo')
  .delete(protect, deleteHotel);

module.exports = router;