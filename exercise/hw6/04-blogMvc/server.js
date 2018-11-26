const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
var mongo = require('mongodb');
const Koa = require('koa');
const session=require('koa-session');
const app = (module.exports = new Koa())

app.use(logger())
app.use(koaBody())

router
 
  .get('/', home)
  .get('/login',showLogin)
  .post('/login',login)
  .get('/:users', listUsers)
  .get('/user/posts',userPosts)
  .get('/:user/post/new', add)
  .get('/:user/post/:id', show)
  .post('/:user/post', create)
  .get('/:user/edit/:id', edit)
  .get('/:user/delete/:id', remove)
  .post('/:user/modify/:id', modify)

app.use(router.routes())
app.use(views(path.join(__dirname, "views"), {
  extension: 'ejs'
}));


async function home(ctx){
  ctx.redirect('/login')
}

async function showLogin (ctx) {
  ctx.body = V.showLogin()
}

async function login (ctx){
  const passport =ctx.request.body
  if(M.login(passport.user, passport.password)){

    ctx.redirect(`/${passport.user}/posts`)
  } else {
    ctx.status =401
    ctx.body ='failed !'
  }
}

async function listUsers (ctx) {
  const users = M.listUsers()
  ctx.body = await V.listUsers(users)
  console.log(`${users}`);
}

async function userPosts(ctx){
  const user = ctx.params.user
  const posts = M.listPosts(user)
  ctx.body = await V.list(user, posts)
}

async function edit (ctx){
  const id =ctx.params.id
  const post = M.get(id)
  ctx.body = await V.edit(post)
}
async function modify (ctx){
  const id =ctx.params.id
  const post = ctx.request.body
  post.id=id
  console.log(post)
  M.modify(post)
  ctx.redirect('/')
}

async function remove(ctx){
  const id = ctx.params.id
  const post = M.remove(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.redirect('/')
}

async function add (ctx) {
  const user=ctx.params.user
  ctx.body = await V.new(user)
}

async function show (ctx) {
  const id = ctx.params.id
  const user = ctx.params.user
  const post = M.get(user,id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(user,post)
}

async function create (ctx) {
  const user = ctx.params.user
  const post = ctx.request.body
  M.add(user,post)
  ctx.redirect(`/${user}/posts`)
}



if (!module.parent) {
  app.listen(3003)
  console.log('Server run at http://localhost:3003')
}
