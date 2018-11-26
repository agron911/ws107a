const validator = require('validator');
const crypto = require('crypto');

module.exports = {
    "(GET|POST) /users/signup": {
        "request": {
            "session": checkNotLogin
        }
    },
    "POST /users/signup": {
        "request": {
            "body": checkSignupBody
        }
    },
    "(GET|POST) /users/login": {
        "request": {
            "session": checkNotLogin
        }
    },
    "POST /users/login": {
        "request": {
            "body": checkSigninBody
        }
    },
    "(GET|POST) /topics/create": {
        "request": {
            "session": checkLogin
        }
    },
    "POST /topics/create": {
        "request": {
            "body": checkCreateBody
        }
    },
    "POST /topics/:id/comment": {
        "request": {
            "session": checkLogin,
            "body": checkReplyTopic
        }
    }
};

function md5 (str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

function checkNotLogin() {
    if (this.session && this.session.user) {
        this.flash = {error: '已登入!'};
        this.redirect('back');
        return false;
    }
    return true;
}

function checkLogin() {
    if (!this.session || !this.session.user) {
        this.flash = {error: '未登入!'};
        this.redirect('/users/login');
        return false;
    }
    return true;
}

function checkSignupBody() {
    let body = this.request.body;
    let flash;
    if (!body || !body.name) {
        flash = {error: '請填寫用戶名!'};
    }
    else if (!body.email || !validator.isEmail(body.email)) {
        flash = {error: '請填寫正確E-mail地址!'};
    }
    else if (!body.password) {
        flash = {error: '請填寫密碼!'};
    }
    else if (body.password !== body.re_password) {
        flash = {error: '兩次密碼不相同!'};
    }
    else if (!body.gender || !~['男', '女'].indexOf(body.gender)) {
        flash = {error: '請選擇性別!'};
    }
    
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.name = validator.trim(body.name);
    body.email = validator.trim(body.email);
    body.password = md5(validator.trim(body.password));
    return true;
}

function checkSigninBody() {
    let body = this.request.body;
    let flash;
    if (!body || !body.name) {
        flash = {error: '請填寫用戶名!'};
    }
    else if (!body.password) {
        flash = {error: '請填寫密碼!'};
    }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.name = validator.trim(body.name);
    body.password = md5(validator.trim(body.password));
    return true;
}

function checkCreateBody() {
    let body = this.request.body;
    let flash;
    if (!body || !body.title || body.title.length <=0) {
        flash = {error: '請填主題!'};
    }
    else if (!body.tab) {
        flash = {error: '請選擇主題!'};
    }
    else if (!body.content) {
        flash = {error: '請填寫內容!'};
    }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.title = validator.trim(body.title);
    body.tab = validator.trim(body.tab);
    body.content = validator.trim(body.content);
    return true;
}

function checkReplyTopic() {
    let body = this.request.body;
    let flash;
    if (!body || !body.topic_id || !validator.isMongoId(body.topic_id)) {
        flash = {error: '您所回覆的貼文不在!'};
    }
    else if (!body.content) {
        flash = {error: '回覆的內容不可為空!'};
    }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.content = validator.trim(body.content);
    return true;
}