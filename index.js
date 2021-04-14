var express = require('express');
var cookieParser = require('cookie-parser');

var userRouter = require('./routes/users.route.js');
var authRouter = require('./routes/auth.route.js');
var authMiddleware = require('./middlewares/auth.middleware')

var port = 3000;

var app = express();

// Sử dụng template engine, dữ liệu hiển thị được sử dụng dưới dạng pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser());


// Truyền callback để sử dụng các biến
app.get('/', function(req, res) {
	res.render('index', { name: 'BLABLA' });
});

// Bắt buộc phải login mới cho sử dụng các chức năng trong users
// <=> Phải vượt qua authMiddleware.requireAuth thì mới truy cập userRouter
app.use('/users', authMiddleware.requireAuth, userRouter); 
app.use('/auth', authRouter); 

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});