// Khai báo các tên hàm xử lý login và export để require trong index.js

var express = require('express');

var router = express.Router();

var controller = require('../controllers/auth.controller.js');

router.get('/login', controller.login); 

router.post('/login', controller.postLogin);

module.exports = router;