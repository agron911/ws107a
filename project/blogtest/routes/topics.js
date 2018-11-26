const T = require('../service/topic');
const C = require('../service/comment');
const Router = require('koa-router');

const topics = new Router();

topics.get('/create', async(ctx)=>{
    await ctx.render('topic/create')
});

topics.post('/create', async(ctx)=>{
    let topic = ctx.request.body;
    topic.user = ctx.session.user;

    let topicSaved = await T.addTopic(topic);

    ctx.flash = {success: '發佈成功！'};
    await ctx.redirect(`/topics/${topicSaved._id}`)
});

topics.get('/:id', async(ctx)=>{
    let id = ctx.params.id;

    let topic = await T.getTopicById(id);

    let comments = await C.getCommentsByTopicId(id);

    await ctx.render('topic/detail', {
        topic: topic,
        comments: comments
    })

});

topics.post('/:id/comment', async(ctx)=>{
    let id = ctx.params.id;
    let comment = ctx.request.body;
    comment.user = ctx.session.user;

    await C.addComment(comment);
    await T.incCommentById(id);

    ctx.flash =  {success: '回覆成功!'};
    await ctx.redirect(ctx.query.redirect || 'back')
});

topics.get('/', async(ctx)=>{

    console.log(ctx.query);

    let tab = ctx.query.tab;
    if(tab == "ALL"){
        tab = null;
    }
    let pageNo = ctx.query.pageNo || 1;

    let topics = await T.getTopicsByTab(tab, pageNo);

    await ctx.render('topic/list',{
        topics: topics
    })
});

topics.get('/user/:name', async (ctx, next)=>{
    let topics = await T.getTopicsByName(ctx.params.name);

    await ctx.render('topic/users-list', {
        name: ctx.params.name, 
        topics: topics
    });
});

module.exports = topics;