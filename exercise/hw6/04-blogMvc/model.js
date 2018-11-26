const M = module.exports = {}

const posts = []
const db = {
  profile: {
    123: { password: '123'},
    111: { password: '111'}
  },
  users: {
    123: {
      posts: [
        {id: 0, title: 'test1', body: 'testtest'},
        {id: 1, title: 'test2', body: 'qweqwe'}
      ]
    },
    111: {
      posts: [
        {id: 0, title: 'aaa', body: 'asd'},
        {id: 1, title: 'bbb', body: 'bnm'},
        {id: 2, title: 'ccc', body: 'cvb'}
      ]
    }
  }
}
M.listUsers = function(){
  return db.users
}

M.login=function(user,password){
  const profile=db.profile[user]
  return(profile.password ===password)
}

M.userPosts=function (user){
  const userTable =db.users[user] ||{}
  const posts = userTable.posts
  if(posts ==null) throw Error('M.userPosts: fail!')
  return posts
}

M.add = function (user,post) {
  const posts=M.userPosts(user)
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}
M.modify =function(post){
  
  posts[post.id]= post


}
M.get = function (id) {
  const posts =M.userPosts(user)
  return posts[id]
}

M.list = function () {
  return posts
}

M.remove =function(id){
  let post =posts[id]
  posts.splice(id,1)
  for(var i = 0; i<posts.length;i++)
  {
    if(posts.id>id)
    {
      posts.id --
    }
  }
 return post
}