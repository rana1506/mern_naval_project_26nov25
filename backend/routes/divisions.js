const express = require('express');
const router = express.Router();
const { createDivision, getDivisions, updateDivision, deleteDivision } = require('../controllers/divisionsController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.use(protect);
router.post('/', roleMiddleware(['admin']), createDivision);
router.get('/', roleMiddleware(['admin','co','do','officer','sailor']), getDivisions);
router.put('/:id', roleMiddleware(['admin']), updateDivision);
router.delete('/:id', roleMiddleware(['admin']), deleteDivision);

module.exports = router;
