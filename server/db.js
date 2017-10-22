const mongoose = require('mongoose');
mongoose.connect('mongodb://ubjsOBarHEZyeNgL:pbtA5yOxYP8L6MpNH@10.10.190.60:27017/Z76zis8g1BJke3RY');

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('数据库连接出错！');
});
db.on('open', function(){
    console.log('数据库连接成功！');
});

//声明schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    // recheck: String,
    token: String,
    create_time: Date
});
//根据schema生成model
const model = {
    User: mongoose.model('User', userSchema)
};

module.exports = model;
