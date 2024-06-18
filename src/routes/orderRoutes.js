const express = require('express');
const multer = require('multer');
const orderController = require('../controllers/orderController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), orderController.uploadFile);
router.get('/', orderController.getOrders);

module.exports = router;
