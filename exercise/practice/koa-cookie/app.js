var koa=require('koa');
var router= require('koa-router')();
var views= require('koa-views');
var bodyparser= require('koa-bodyparser');
var koastatic=require('koa-static');
const renderAT=require('koa-art-template');
const path=require('path');


var app=new koa();

renderAT(app,{
    root:path.join(__dirname,'views'),
    extname:'.html',
    debug: process.env.NODE_ENV !=='production '
})


app.use(bodyparser());
//app.use(koastatic('./static'));
app.use(koastatic(__dirname+'/static'));



router.get('/',async (ctx)=>{
        
    ctx.cookies.set('userinfo','agron11',{
        maxAge:60*100*60,
        path:'/news'
    })
    
        let app={
            name:"agron",
        }

        await ctx.render('index',{
            list:app
        });
})  

router.post('/doAdd',async (ctx)=>{
    console.log(ctx.request.body);
     //ctx.request.body獲取表單提供數據
     ctx.body="成功進入其他頁面";
})
router.get('/news',async (ctx)=>{
    var user=ctx.cookies.get('userinfo');
    console.log(user);
    ctx.body="user";
    await ctx.render('news');
})
router.get('/shop',async (ctx)=>{
    var user=ctx.cookies.get('userinfo');
    console.log(user);
    ctx.body='user';
    await ctx.render('shop');
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
console.log('listen to 3000');
