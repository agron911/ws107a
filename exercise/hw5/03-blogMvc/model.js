const M = module.exports = {}

const posts = []

M.add = function (post) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}
M.modify =function(post){
  
  posts[post.id]= post


}
M.get = function (id) {
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