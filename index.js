var express = require('express');
var userRouter = require('./routes/users.route.js');
var cookieParser = require('cookie-parser');

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

app.use('/users', userRouter); 

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});