// src/models/Hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de l\'hôtel est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  },
  address: {
    street: String,
    city: String,
    country: String,
    zipCode: String
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [String],
  images: [String],
  rooms: {
    type: Number,
    required: true,
    min: 1
  },
  available: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);