const asyncHandler = require('express-async-handler');
const Officer = require('../models/Officer');

const createOfficer = asyncHandler(async (req, res) => {
  const { user: userId, rank, branch, phone, address } = req.body;
  const exists = await Officer.findOne({ user: userId });
  if (exists) { res.status(400); throw new Error('Officer profile already exists'); }
  const officer = await Officer.create({ user: userId, rank, branch, phone, address });
  res.status(201).json(officer);
});

const getOfficers = asyncHandler(async (req, res) => {
  const officers = await Officer.find().populate('user','serviceNo name roles');
  res.json(officers);
});

const getOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.findById(req.params.id).populate('user','serviceNo name roles');
  if (!officer) { res.status(404); throw new Error('Not found'); }
  res.json(officer);
});

const updateOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.findById(req.params.id);
  if (!officer) { res.status(404); throw new Error('Not found'); }
  ['rank','branch','phone','address'].forEach(f => { if (req.body[f] !== undefined) officer[f] = req.body[f]; });
  await officer.save();
  res.json(officer);
});

const deleteOfficer = asyncHandler(async (req, res) => {
  await Officer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = { createOfficer, getOfficers, getOfficer, updateOfficer, deleteOfficer };
