var express = require('express');

var router = express.Router();

var controller = require('../controllers/users.controller.js');
var usersValidate = require('../validate/users.validate');

router.get('/', controller.index); 

router.get('/cookie', function(req, res, next) {
	res.cookie('user-id', 12345);
	res.send('HELLO');
});

// Nhận thông tin query từ view và lọc tên theo ký tự tìm kiếm
router.get('/search', controller.search);

// Nhận thông tin từ view và thêm vào danh sách
router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', usersValidate.postCreate, controller.postCreate);

module.exports = router;