// src/controllers/dashboardController.js
const Hotel = require('../models/Hotel');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalHotels = await Hotel.countDocuments();
    const totalUsers = await User.countDocuments();
    const recentHotels = await Hotel.find()
      .sort('-createdAt')
      .limit(5)
      .populate('createdBy', 'name');
    
    const stats = {
      totalHotels,
      totalUsers,
      recentHotels,
      averagePrice: await Hotel.aggregate([
        { $group: { _id: null, avgPrice: { $avg: '$pricePerNight' } } }
      ])
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};