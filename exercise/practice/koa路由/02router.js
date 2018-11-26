var koa=require('koa');
var router= require('koa-router')();

var app=new koa();


router.get('/',async (ctx )=>{

    ctx.body='首頁';
}).get('/news',async (ctx)=>{
    ctx.body="這是一個新聞頁面";
}).get('/newscontent',async (ctx)=>{

    console.log(ctx.query);
    console.log(ctx.querystring);
    ctx.body="新聞詳情";
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
