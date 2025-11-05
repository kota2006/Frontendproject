const router = require('express').Router();
const User = require('../models/User');
const Resource = require('../models/Resource');
const Program = require('../models/Program');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.countDocuments();
    const resources = await Resource.countDocuments();
    const programs = await Program.countDocuments();
    res.json({ users, resources, programs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
