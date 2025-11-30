const express = require('express');
const router = express.Router();
const { createSailor, getSailors, getSailor, updateSailor, deleteSailor } = require('../controllers/sailorsController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.use(protect);
router.post('/', roleMiddleware(['admin','do','sailor']), createSailor);
router.get('/', roleMiddleware(['admin','co','do','officer']), getSailors);
router.get('/:id', roleMiddleware(['admin','co','do','officer','sailor']), getSailor);
router.put('/:id', roleMiddleware(['admin','do']), updateSailor);
router.delete('/:id', roleMiddleware(['admin']), deleteSailor);

module.exports = router;
