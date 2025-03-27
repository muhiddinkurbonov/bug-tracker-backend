const Bug = require("../models/Bug");

exports.getBugs = async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
};

exports.createBug = async (req, res) => {
  const bug = new Bug(req.body);
  const newBug = await bug.save();
  res.status(201).json(newBug);
};

exports.updateBug = async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (!bug) return res.status(404).json({ message: "Bug not found" });
  Object.assign(bug, req.body);
  bug.updatedAt = Date.now();
  const updatedBug = await bug.save();
  res.json(updatedBug);
};

exports.deleteBug = async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (!bug) return res.status(404).json({ message: "Bug not found" });
  await bug.remove();
  res.json({ message: "Bug deleted" });
};
