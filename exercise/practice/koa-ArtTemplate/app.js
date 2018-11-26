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


router.get('/',async (ctx )=>{
        
        let app={
            name:"agron",
            h:"<h2>this is a h2</h2>",
            nums:9,
            data:['11111','2222','333']
        }

        await ctx.render('index',{
            list:app
        });
})  

router.post('/doAdd',async (ctx)=>{
    console.log(ctx.request.body);
     //ctx.request.body獲取表單提供數據
     ctx.body="登入成功";
})
router.get('/news',async (ctx)=>{

        let list={
            name:"agron",
            h:"<h2>this is a h2</h2>",
            nums:20,
            data:['11111','2222','333']
        }
        
        await ctx.render('news',{
            l:list
      
        });
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
console.log('listen to 3000');
