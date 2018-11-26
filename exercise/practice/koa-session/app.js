var koa=require('koa');
var router= require('koa-router')();
var views= require('koa-views');
var bodyparser= require('koa-bodyparser');
var koastatic=require('koa-static');
const renderAT=require('koa-art-template');
const path=require('path');
const session=require('koa-session');

var app=new koa();

renderAT(app,{
    root:path.join(__dirname,'views'),
    extname:'.html',
    debug: process.env.NODE_ENV !=='production '
})
app.keys=['some seret hurr'];
const CONFIG={
    key:"koa:sess",
    maxAge:50000,
    overwrite:true,
    httpOnly:true,
    signed:true,
    rolling:false,
    renew:false
};
app.use(session(CONFIG,app));

app.use(bodyparser());
//app.use(koastatic('./static'));
app.use(koastatic(__dirname+'/static'));



router.get('/',async (ctx)=>{
        
        console.log(ctx.session.userinfo);
        let app={
            name:"agron11",
        }

        await ctx.render('index',{
            list:app
        });
})  

router.post('/doAdd',async (ctx)=>{
     //ctx.request.body獲取表單提供數據
     ctx.body="成功進入其他頁面";
    
     
})
router.get('/login',async (ctx)=>{
    ctx.session.userinfo="agron";
    ctx.body="login susscess";
    
})
router.get('/shop',async (ctx)=>{
    console.log(ctx.session.userinfo);
    ctx.body="ok";
   
 
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
console.log('listen to 3000');
