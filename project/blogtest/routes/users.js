const User = require('../service/user');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
let users = new Router();

users.get('/login', async (ctx, next) => {
    await ctx.render('login');
});

users.post('/login', async (ctx, next) => {
    let data = ctx.request.body;

    let user = await User.getUserByName(data.name);
    if (!user || (user.password !== data.password)) {
        ctx.flash = { error: '名字或密碼輸入錯誤！' };
        return ctx.redirect('back');
    }

    ctx.session.user = user;

    ctx.flash = { success: '登入成功！' };
    await ctx.redirect(`/topics/user/${data.name}`);
});

users.get('/update', async (ctx, next) => {
    console.log(ctx.session.user.name)
    await ctx.render('update')
});



users.get('/logout', async (ctx, next) => {
    ctx.session = null;
    ctx.redirect('/users/login');
});

users.get('/signup', async (ctx) => {
    await ctx.render('signup');
});

users.post('/signup', async (ctx) => {
    let data = ctx.request.body;

    let exist = await User.getUserByName(data.name);
    if (exist) {
        ctx.flash = { error: '用戶名已經存在!' };
        return ctx.redirect('back');
    }
    await User.addUser(data);

    ctx.session.user = {
        name: data.name,
        email: data.email
    };

    fs.readFile(__dirname+"/../public/avatar1.png", function(err, data) {if(err){console.log(err)}
        console.log('讀取完成！');
        fs.writeFile(__dirname+`/../public/images/${ctx.session.user.name}.jpg`,  data, function(err) {
            if(err){console.log(err)}
          console.log('寫入完成!');
        });
      });

    ctx.flash = { success: '註冊成功！' };

    await ctx.redirect(`/topics/user/${data.name}`);
});
users.post('/upload', async (ctx) => {
    let file = ctx.request.files.file;
    console.log(file);
    // if (path.extname(file.name) == 'jpg') {
        let reader = fs.createReadStream(file.path);
        let stream = fs.createWriteStream(path.join(__dirname, '..', 'public', 'images', ctx.session.user.name + '.jpg'));
        reader.pipe(stream);
        console.log('uploading %s -> %s', file.name, stream.path);
    // }
    ctx.redirect('/');
})

module.exports = users;