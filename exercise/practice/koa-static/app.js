var koa=require('koa');
var router= require('koa-router')();
var views= require('koa-views');
var common=require('./module/common.js');


var app=new koa();

app.use(views('views',{
    extension:'ejs'
}))

router.get('/',async (ctx )=>{
        
        await ctx.render('index');
})  

router.post('/doAdd',async (ctx)=>{

   var data=await common.getPostData(ctx);

   console.log(data);

   ctx.body=data;
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
console.log('listen to 3000');
