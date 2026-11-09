const bcrypt = require('bcryptjs')

let users = []
let posts = []

async function spawnUsers(newUsers){
  users = structuredClone(newUsers)
  console.log(users, " read")//
  return true
}
async function getUsers(){
  return users
}
 
async function createUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  let id = generateID(8)
  if(!isValidID(id, "users")) id =generateID(8)
  users.push({ username, id: id, password: hashed, bio: "No bio yet...", starredPosts:[], posts: [] });
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
    starredPosts: user.starredPosts,
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
  post["stars"] = 0
  post["comments"] = []
  if(users.at(index)) users.at(index).posts.push(post)
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

async function updatePost(newTitle, newDescription, author, postID){
  const user = users.find(user => user.username === author)
  if(user){
    const index = user.posts.findIndex(post => parseInt(post.id) === parseInt(postID))
    if(index !== -1){
      user.posts[index].title = newTitle
      user.posts[index].description = newDescription
      return true
    }
  }
  return false
}

async function starPost(postID, username, stars){
  const userIndex = users.findIndex(user => user.username === username)
  if(userIndex === -1) return false

  const postIndex = posts.findIndex(post => post.id === postID)
  if(postIndex === -1) return false

  if(stars > posts[postIndex].stars){
    users[userIndex].starredPosts.push(postID)
  }else{
    const index = users[userIndex].starredPosts.indexOf(postID)
    users[userIndex].starredPosts.splice(index, 1)
  }
  posts[postIndex].stars = stars
  return true
}

async function addComment(postID, commentAuthor, date, commentText){
  const userIndex = users.findIndex(user => user.username === commentAuthor)
  if(userIndex === -1) return false

  let postIndex = posts.findIndex(post => post.id === postID)
  if(postIndex === -1) return false

  const comment = { author: commentAuthor, date: date, text: commentText, id: generateID(6)}
  
  const postAuthor = posts[postIndex].author

  const index = users.findIndex(user => user.username === postAuthor)
  if(index === -1) return false

  postIndex = users[index].posts.findIndex(post => post.id === postID)
  if(postIndex === -1) return false

  users[index].posts[postIndex].comments.push(comment)
  return true
}
 
module.exports = { createUser, findUser, getPosts, 
   addPost, deletePost, updatePost, starPost,
    getUser, deleteUser, updateUser, updatePass, addComment,
      getUsers, spawnUsers };