var db = require('../db.js');
var shortid = require('shortid');

module.exports.index = function(req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	});
};

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

module.exports.create = function(req, res) {
	res.render('users/create');
};

module.exports.get = function(req, res) {
	var id = req.params.id;

	var user = db.get('users').find({ id: id }).value();

	res.render('users/view', {
		user: user
	});
};

module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate();
	// Mảng lưu lại tên các lỗi
	var errors = [];

	// Nếu không nhập tên
	if(!req.body.name) {
		// thêm lỗi vào mảng
		errors.push('Name is required.');
	}

	// Nếu không nhập sdt
	if(!req.body.phone) {
		// thêm lỗi vào mảng
		errors.push('Phone is required.');
	}

	// Nếu có lỗi trong mảng
	if(errors.length) {
		// trả về 2 giá trị là mảng lỗi và các giá trị đã nhập
		res.render('users/create', {
			errors: errors,
			values: req.body
		});
		return;
	}

	// Nếu k có lỗi thì ghi vào db
	db.get('users').push(req.body).write();
	res.redirect('/users');
};