const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.use(protect);
router.get('/', roleMiddleware(['admin']), getUsers);
router.get('/:id', roleMiddleware(['admin','co','officer']), getUser);
router.put('/:id', roleMiddleware(['admin']), updateUser);
router.delete('/:id', roleMiddleware(['admin']), deleteUser);

module.exports = router;
