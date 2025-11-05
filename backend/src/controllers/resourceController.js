const Resource = require('../models/Resource');

exports.create = async (req, res) => {
  try {
    const { title, description, category, link } = req.body;
    const resource = await Resource.create({ title, description, category, link, createdBy: req.user._id });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const resources = await Resource.find().sort('-createdAt');
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
