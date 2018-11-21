import mongoose from 'mongoose'
var Schema = mongoose.Schema;
const UserSchema = new Schema({
name: { type: String, required: true},
password: { type: String, required: true },
email: { type: String, required: true ,unique: true},
createdTime: { type: Date, default: Date.now() }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;

var user = null,result = null,req = ctx.request,
name = req.body.name,
password = SHA256(req.body.password),
email = req.body.email;
user = new UserModel({
name: name,
password: password,
email: email,
});
result = await user.save().catch(e => e); //使用await進行非同步操作儲存資料到資料庫
if(result && result._id) {
console.log(result._id);
console.log('success');
ctx.response.redirect('/login');
} else {
console.log("郵箱或使用者名稱已經被註冊過了！！！");
}

var req = ctx.request,
name = req.body.name,
password = SHA256(req.body.password),
email = req.body.email;
var result = await UserModel.findOne({
name: name,
password: password.toString(),
email: email
}); //使用await進行非同步操作查詢資料庫中的資料
if (result && result._id) {
console.log('登入成功！！！');
ctx.set('Access-Control-Allow-Origin', '*');
ctx.response.status = 200;
ctx.response.type = 'application/json';
ctx.response.body = { name: name, password: password, email: email };
} else {
ctx.throw(400, 'some information wrong!');
console.log('登入資訊不匹配！');
}