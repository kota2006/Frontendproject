const Program = require('../models/Program');
const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const programs = await Program.find().sort('-createdAt');
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.join = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Not found' });
    if (!program.members.includes(req.user._id)) {
      program.members.push(req.user._id);
      await program.save();
      const user = await User.findById(req.user._id);
      user.joinedPrograms.push(program._id);
      await user.save();
    }
    res.json({ message: 'Joined' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
