const bcrypt = require('bcryptjs')

const users = []
let posts = []

async function generateStaticUsers(){
    if(!await findUser("wra1th")){
      const pass1 = await bcrypt.hash("1q2w3e", 10)
      users.push({ username: "wra1th", password: pass1, posts: [
        { author: "wra1th", title: "Who cares about design", description: "-nobody", date: "2026-09-09"}, //! date in YYYY-MM-DD only
        { author: "wra1th", title: "sin^2 + cos^2 = 1", description: "ctg is useless when tg is nearby", date: "2026-10-01"}
      ]})
    }

    if(!await findUser("wra11tthh")){
      const pass2 = await bcrypt.hash("0p9o8i", 10)
       users.push({ username: "wra11tthh", password: pass2, posts: []})
    }

    if(!await findUser("JohnWick")){
      const pass3 = await bcrypt.hash("1234", 10)
      users.push({ username: "JohnWick", password: pass3, posts: [
        { author: "JohnWick", title: "Johnny Silverhand as a calm and sensitive character", description: "lorem lorem lorem lorem lorem", date: "2025-06-07"}
      ]})
    }
}
 
async function createUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, posts: [] });
}
 
async function findUser(username) {
  return users.find(u => u.username === username);
}

async function getPosts(){
  posts = []
  for (const el of users) {
    for (const post of el.posts) {
      post["id"] = posts.length+1
      posts.push(post)
    }
  }
  return posts
}

async function addPost(post){
  const index = users.findIndex(user => user.username === post.author)
  users.at(index).posts.push(post)
}

async function deletePost(postID){
  for (const user of users) {
    for (const post of user.posts) {
      if(parseInt(post.id) === parseInt(postID.id)){
        user.posts.splice(user.posts.indexOf(post), 1)
      }
    }
  }
}

async function updatePost(newPost){
  const user = users.find(user => user.username === newPost.author)
  console.log(users)
  if(user){
    const index = user.posts.findIndex(post => parseInt(post.id) === parseInt(newPost.id))
    console.log(user.posts)
    if(index !== -1){
      user.posts[index] = newPost
    }
  }
}
 
module.exports = { createUser, findUser, getPosts, generateStaticUsers, addPost, deletePost, updatePost };