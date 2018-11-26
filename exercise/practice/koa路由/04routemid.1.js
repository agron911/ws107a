var koa=require('koa');
var router= require('koa-router')();

var app=new koa();

app.use(async (ctx,next)=>{

    console.log(new Date());
    await next();
})


router
    .get('/',async (ctx )=>{
    ctx.body='首頁';
})  
    .get('/news',async (ctx,next)=>{
        console.log("這是新聞頁面");
        console.log('2');
        await next();
        console.log('3');
    })
    .get('/news',async (ctx)=>{
        console.log('1');
    ctx.body="這是一個新聞頁面";
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
