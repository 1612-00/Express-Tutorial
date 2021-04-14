module.exports.postCreate = function(req, res, next) {
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

	next();
}
