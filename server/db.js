const mongoose = require('mongoose');

let connectStr = undefined;
if(typeof ENV !== 'undefined' && ENV['MONGODB_CONNECTION']){
	connectStr = ENV['MONGODB_CONNECTION'];
} else {
	connectStr = 'mongodb://localhost/vue-login';
}
mongoose.connect(connectStr);

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
