var express = require('express');

var router = express.Router();

var controller = require('../controllers/users.controller.js');

router.get('/', controller.index); 

// Nhận thông tin query từ view và lọc tên theo ký tự tìm kiếm
router.get('/search', controller.search);

// Nhận thông tin từ view và thêm vào danh sách
router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', controller.postCreate);

module.exports = router;