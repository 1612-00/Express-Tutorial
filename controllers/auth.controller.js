// Chi tiết các hàm hiển thị form login và post dữ liệu login

var db = require('../db.js');

// Hiển thị form login
module.exports.login = function(req, res, next) {
	res.render('auth/login');
};

// Post dữ liệu lên 
module.exports.postLogin = function(req, res, next) {
	// Dữ liệu được nhập vào input
	var email = req.body.email;
	var password = req.body.password;

	// Kiểm tra email có trùng với 1 email trong db không
	var user = db.get('users').find({ email: email }).value();

	// Nếu không trùng thì đưa ra 1 thông báo error ở view, load lại trang login
	if(!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist.'
			], 
			values: req.body
		});
		return;
	}

	// Kiểm tra password nhập có trùng với password của email đó trong db không
	if(user.password !== password) {
		// Nếu không trùng thì đưa ra 1 thông báo error ở view, load lại trang login
		res.render('auth/login', {
			errors: [
				'Wrong password.'
			],
			values: req.body
		});
		return;
	}

	// Trả về 1 cookie và load đến trang users 
	res.cookie('userId', user.id);
	res.redirect('/users');
};
