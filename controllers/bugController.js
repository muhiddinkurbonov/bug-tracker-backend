const Bug = require("../models/Bug");

// @desc    Get all bugs
exports.getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc    Create a new bug
exports.createBug = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const bug = new Bug({ title, description, status, priority });
    const savedBug = await bug.save();
    res.status(201).json(savedBug);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

// @desc    Update a bug by ID
exports.updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    Object.assign(bug, req.body);
    const updatedBug = await bug.save();
    res.json(updatedBug);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Invalid update data", error: err.message });
  }
};

// @desc    Delete a bug by ID
exports.deleteBug = async (req, res) => {
  try {
    console.log(`Deleting bug with ID: ${req.params.id}`);
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    // Use findByIdAndDelete instead of remove
    await Bug.findByIdAndDelete(req.params.id);
    res.json({ message: "Bug deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = exports;
