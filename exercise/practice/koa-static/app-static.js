var koa=require('koa');
var router= require('koa-router')();
var views= require('koa-views');
var bodyparser= require('koa-bodyparser');
var koastatic=require('koa-static');


var app=new koa();

app.use(views('views',{
    extension:'ejs'
}))

app.use(bodyparser());
//app.use(koastatic('./static'));
app.use(koastatic(__dirname+'/static'));
router.get('/',async (ctx )=>{
        
        await ctx.render('index');
})  

router.post('/doAdd',async (ctx)=>{
    console.log(ctx.request.body);
   ctx.body=ctx.request.body;   //ctx.request.body獲取表單提供數據
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
console.log('listen to 3000');
