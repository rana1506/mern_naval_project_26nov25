const asyncHandler = require('express-async-handler');
const Sailor = require('../models/Sailor');

const createSailor = asyncHandler(async (req, res) => {
  const { user: userId, division, trade, medicalFit, phone, address } = req.body;
  const exists = await Sailor.findOne({ user: userId });
  if (exists) { res.status(400); throw new Error('Sailor profile exists'); }
  const sailor = await Sailor.create({ user: userId, division, trade, medicalFit, phone, address });
  res.status(201).json(sailor);
});

const getSailors = asyncHandler(async (req, res) => {
  const q = {};
  if (req.query.division) q.division = req.query.division;
  const sailors = await Sailor.find(q).populate('user','serviceNo name').populate('division','name');
  res.json(sailors);
});

const getSailor = asyncHandler(async (req, res) => {
  console.log(req.user)
  const sailor = await Sailor.findOne({ user: req.params.id })
      .populate("user")
      .populate("division");
  if (!sailor) { res.status(404); throw new Error('Not found'); }
  const requester = req.user;

  const isOwner = requester._id.toString() === req.params.id.toString();
  const isAdmin = requester.roles.includes("admin");
  const isCO = requester.roles.includes("co");

  // DO rule: can only view sailors in his division
  const isDO = requester.roles.includes("do");
  let doCanView = false;

  if (isDO && sailor.division) {
    doCanView = sailor.division.do?.toString() === requester._id.toString();
  }

  if (!isOwner && !isAdmin && !isCO && !doCanView) {
    res.status(403);
    throw new Error("Access Denied");
  }
  res.json(sailor);
});

const updateSailor = asyncHandler(async (req, res) => {
  
  const sailor = await Sailor.findOne({ user: req.params.id });
  if (!sailor) { res.status(404); throw new Error('Not found'); }
  
  const requester = req.user;

  const isOwner = requester._id.toString() === sailor.user.toString();
  const isAdmin = requester.roles.includes("admin");
  const isDO = requester.roles.includes("do");

  // DO can only update sailors in his division — except division field itself
  if (isDO && sailor.division.toString() !== requester.division?.toString()) {
    res.status(403);
    throw new Error("DO cannot edit sailors of other divisions");
  }

  // Field-level access
  if (!isAdmin && !isDO && !isOwner) {
    res.status(403);
    throw new Error("Access Denied");
  }

  // Prevent non-admins from changing division
  if (!isAdmin && req.body.division) {
    delete req.body.division;
  }

  /* const updated = await Sailor.findByIdAndUpdate(
    sailor._id,
    req.body,
    { new: true }
  );
  res.json(updated); */
  
  // allow updating specific fields; field-level RBAC should be enforced by middleware/controller
  ['division','trade','medicalFit','phone','address'].forEach(f => { if (req.body[f] !== undefined) sailor[f] = req.body[f]; });
  await sailor.save();
  res.json(sailor);
});

const deleteSailor = asyncHandler(async (req, res) => {
  const sailor = await Sailor.findOneAndDelete({ user: req.params.id });
  if (!sailor) { res.status(404); throw new Error('Not found'); }
  res.json({ message: 'Deleted' });
});

module.exports = { createSailor, getSailors, getSailor, updateSailor, deleteSailor };
