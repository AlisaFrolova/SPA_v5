const bcrypt = require('bcryptjs')

const users = []
let posts = []

async function generateStaticUsers(){
    if(!await findUser("wra1th")){
      const pass1 = await bcrypt.hash("1q2w3e", 10)
      users.push({ username: "wra1th", id: "09091001",password: pass1, bio: "the worst user ever", posts: [
        { id: "253874", author: "wra1th", title: "Who cares about design", description: "-nobody", date: "2026-09-09"}, //! date in YYYY-MM-DD only
        { id: "411290", author: "wra1th", title: "sin^2 + cos^2 = 1", description: "ctg is useless when tg is nearby", date: "2026-10-01"}
      ]})
    }

    if(!await findUser("wra11tthh")){
      const pass2 = await bcrypt.hash("0p9o8i", 10)
       users.push({ username: "wra11tthh", id: "00000000", bio: "No bio yet..0", password: pass2, posts: []})
    }

    if(!await findUser("JohnWick")){
      const pass3 = await bcrypt.hash("1234", 10)
      users.push({ username: "JohnWick", id:"63988077", bio: "Time to party like it's 2023", password: pass3, posts: [
        { id:"338102", author: "JohnWick", title: "Johnny Silverhand as a calm and sensitive character", description: "lorem lorem lorem lorem lorem", date: "2025-06-07"}
      ]})
    }
}
 
async function createUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  let id = generateID(8)
  if(!isValidID(id, "users")) id =generateID(8)
  users.push({ username, id: id, password: hashed, bio: "No bio yet...", posts: [] });
}
 
async function findUser(username) {
  return users.find(u => u.username === username);
}

async function deleteUser(username){
  const index = users.findIndex(user => user.username === username)
  if(index === -1) return false
  users.splice(index, 1)
  return true
}

async function updateUser(userData){
  const index = users.findIndex(user => user.username === userData.username)
  if(index === -1) return false
  
  const newIndex = users.findIndex(user => user.username === userData.newUsername)
  if(newIndex !== -1) return false

  users[index].username = userData.newUsername
  if(userData.newBio === "") userData.newBio = "No bio yet..."
  users[index].bio = userData.newBio

  if(users[index].posts){
    for (const post of users[index].posts) {
      post.author = userData.newUsername
    }
  }

  return true
}

async function updatePass(username, newPassword){
  const index = users.findIndex(user => user.username === username)
  if(index === -1) return false

  const hashed = await bcrypt.hash(newPassword, 10)
  users[index].password = hashed
  return true
}

async function getUser(username){
  const index = users.findIndex(user => user.username === username)
  if(index === -1) return false
  const user = users[index]
  const tempUser = {
    username: user.username,
    id: user.id,
    bio: user.bio,
    posts: user.posts
  }
  return tempUser
}

async function getPosts(){
  posts = []
  for (const el of users) {
    for (const post of el.posts) {
      posts.push(post)
    }
  }
  return posts
}

async function addPost(post){
  const index = users.findIndex(user => user.username === post.author)
  let id = generateID(6)
  if(!isValidID(id, "posts")) id =generateID(6)
  post["id"] = id
  users.at(index).posts.push(post)
}

function generateID(length){
  let id = ""
  for(let i = 0; i < length; i++){
    id = `${id}${Math.floor(Math.random() * 9)}`
  }
  return id
}
function isValidID(id, type){
  let arr = []
  if(type === "users") arr = users
  if(type === "posts") arr = posts
  if(arr.findIndex(el => el.id === id) === -1) return true
  else return false
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
 
module.exports = { createUser, findUser, getPosts, generateStaticUsers,
   addPost, deletePost, updatePost,
    getUser, deleteUser, updateUser, updatePass };