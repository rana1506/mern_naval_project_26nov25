const asyncHandler = require('express-async-handler');
const Division = require('../models/Division');

const createDivision = asyncHandler(async (req, res) => {
  const { name, description, do: doUser } = req.body;
  const exists = await Division.findOne({ name });
  if (exists) { res.status(400); throw new Error('Division exists'); }
  const division = await Division.create({ name, description, do: doUser });
  res.status(201).json(division);
});

const getDivisions = asyncHandler(async (req, res) => {
  const divisions = await Division.find().populate('do','serviceNo name');
  res.json(divisions);
});

const updateDivision = asyncHandler(async (req, res) => {
  const division = await Division.findById(req.params.id);
  if (!division) { res.status(404); throw new Error('Not found'); }
  ['name','description','do'].forEach(f => { if (req.body[f] !== undefined) division[f] = req.body[f]; });
  await division.save();
  res.json(division);
});

const deleteDivision = asyncHandler(async (req, res) => {
  await Division.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = { createDivision, getDivisions, updateDivision, deleteDivision };
