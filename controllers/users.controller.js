// Chi tiết các hàm được sử dụng trong module users 

var db = require('../db.js');
var shortid = require('shortid');

module.exports.index = function(req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	});
};

// lọc users theo tên dc tìm kiếm
module.exports.search = function(req, res) {
	var q = req.query.q;
	var users = db.get('users').value();
	var matchedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers
	});
};

// load trang create user 
module.exports.create = function(req, res) {
	res.render('users/create');
};

// Tìm dữ liệu theo id
module.exports.get = function(req, res) {
	var id = req.params.id;

	var user = db.get('users').find({ id: id }).value();

	res.render('users/view', {
		user: user
	});
};

// Ghi dữ liệu nhập vào db
module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
};