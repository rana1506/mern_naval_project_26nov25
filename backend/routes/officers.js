const express = require('express');
const router = express.Router();
const { createOfficer, getOfficers, getOfficer, updateOfficer, deleteOfficer } = require('../controllers/officersController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.use(protect);
router.post('/', roleMiddleware(['admin','co']), createOfficer);
router.get('/', roleMiddleware(['admin','co','officer']), getOfficers);
router.get('/:id', roleMiddleware(['admin','co','officer']), getOfficer);
router.put('/:id', roleMiddleware(['admin','co']), updateOfficer);
router.delete('/:id', roleMiddleware(['admin']), deleteOfficer);

module.exports = router;
