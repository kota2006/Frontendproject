const router = require('express').Router();
const programController = require('../controllers/programController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', programController.list);
router.post('/', verifyToken, requireRole('admin'), programController.create);
router.post('/:id/join', verifyToken, programController.join);
router.delete('/:id', verifyToken, requireRole('admin'), programController.remove);

module.exports = router;
