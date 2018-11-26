var koa=require('koa');
var router= require('koa-router')();
var views= require('koa-views');

var app=new koa();


app.use(views('views',{
    extension:'ejs'
}))

app.use(async(ctx,next)=>{

    ctx.state.user="agron";
    await next();
})

app.use(async (ctx,next)=>{

    console.log(new Date());
    await next();
})


router
    .get('/',async (ctx )=>{
        
        let title="妳好 ejs";
        await ctx.render('index',{
           titles:title
        });
})  
    .get('/news',async (ctx,next)=>{
        ctx.body="這是新聞頁面";
        let arr=['1111','222','333'];
        let num=123;
        await ctx.render('new',{
            list:arr,
            nums:num
        });
    })
    .get('/newscontent/:aid',async (ctx)=>{
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx.querystring);
    ctx.body="新聞詳情";
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
console.log('listen to 3000');
