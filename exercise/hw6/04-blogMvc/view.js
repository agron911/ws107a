var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      h1 {
        font-size: 2em;
      }
      h2 {
        font-size: 1.2em;
      }
      #posts {
        margin: 0;
        padding: 0;
      }
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
  <h>agron</h>
    <section id="content">
      ${content}
    </section>
    
  </body>
  </html>
  `
}
V.listUsers = function (users) {
  let list = []
  for (let user of Object.keys(users)) {
    list.push(`<li><a href="/${user}/posts">${user} 的留言板</a></li>`)
  }
  return V.layout(`<h1>所有留言板列表</h1>`, `
    <ol>${list.join('\n')}</ol>
  `)
}
V.showLogin = function () {
  return V.layout('登入', `
  <h2>登入</h2>
  <form action="/login" method="post">
    <p><input type="text" placeholder="User" name="user"></p>
    <p><input type="password" placeholder="Password" name="password"></textarea></p>
    <p><input type="submit" value="登入"/><input type="reset" value="清除"/></p>
  </form>
  `)
}
V.userLayout = function (user, title, content) {
  return V.layout(title, `<h1>${user} 的留言板</h1>\n` + content)
}
V.list = function (user,posts) {
  let list = []
  let count =0
  for (let post of posts) {
    if(post ==null) continue
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/${user}/post/${post.id}">讀取貼文</a></p>
    </li>
    `)
    count ++
  }
  let content = `
  <h1>貼文列表</h1>
  <p>您總共有 <strong>${count}</strong> 則貼文!</p>
  <p><a href="/${user}/post/new">創建新貼文</a></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.layout('貼文列表', content)
}

V.new = function (user) {
  return V.userlayout(user,'新增貼文', `
  <h1>新增貼文</h1>
  <p>創建一則新貼文</p>
  <form action="/${user}/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.show = function (post) {
  return V.layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    <a href="/edit/${post.id}">編輯</a>
    <a href="/delete/${post.id}">刪除</a>
  `)
}

V.edit = function(post){
  return V.layout('編輯貼文', `
  <h1>編輯</h1>
  <form action="/modify/${post.id}" method="post">
    <p><input type="text" placeholder="Title" name="title" value=${post.title}></p>
    <p><textarea placeholder="Contents" name="body" >${post.body}</textarea></p>
    <p><input type="submit" value="modify"></p>
  </form>
  `)
}
