const router = require('express').Router();
const resourceController = require('../controllers/resourceController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', resourceController.list);
router.post('/', verifyToken, requireRole('admin'), resourceController.create);
router.put('/:id', verifyToken, requireRole('admin'), resourceController.update);
router.delete('/:id', verifyToken, requireRole('admin'), resourceController.remove);

module.exports = router;
