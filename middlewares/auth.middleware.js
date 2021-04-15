var db = require('../db');

// middleware xác định xem cookie nhận được có giống cookie được response về k
module.exports.requireAuth = function(req, res, next) {
	// Nếu không có cookie thì load lại trang login
	if(!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;	
	}

	// Lấy user có Id trùng với userId trong cookie 
	var user = db.get('users').find({ id: req.signedCookies.userId }).value();

	// Nếu không trùng, load lại trang login
	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	// Chỉ tồn tại trong 1 phiên req - res, không ảnh hưởng đến các phiên khác
	res.locals.user = user;

	// Thỏa mãn thì next
	next();
};