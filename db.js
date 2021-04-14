var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

var db = low(adapter);
// Đặt giá trị ban đầu cho data base là 1 mảng users rỗng
db.defaults({ users: [] }).write();

module.exports = db;