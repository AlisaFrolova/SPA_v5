const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUser, getPosts,
   addPost, deletePost, updatePost, starPost,
    getUser, deleteUser, updateUser, updatePass,
      addComment, getUsers, spawnUsers } = require('./users');
const cookieParser = require("cookie-parser")
const fs = require('fs/promises');

const ACCESS_SECRET = 'mySecretWord1'
const ACCESS_EXPIRES = 60*15

const REFRESH_SECRET = 'mySecretWord2'
const REFRESH_EXPIRES = 60*60*24 //sec*min*hours

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(`[${req.method}]: ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server launched on http://localhost:${PORT}`);
});

async function readUsersFile() {
     try {
     const data = await fs.readFile(FILE_PATH, 'utf-8');
       return JSON.parse(data);
    } catch (error) {
       if (error.code === 'ENOENT') {
           return [];
         }
         throw error;
   }
}
app.get('/read', async (req, res) => {
     try {
      const users = await readUsersFile();
      const isSpawned = await spawnUsers(users)
      if(isSpawned) return res.status(200)
     } catch (error) {
       console.error(error);
     res.status(500).json({ error: 'Error while reading file' });
   }
});
app.get('/write', async (req, res) => {
   try {
    let users = await getUsers()
    console.log(users, " writing")
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');

    return res.status(201)
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Ошибка при записи в файл' });
    }
});


//register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body
  if (await findUser(username))
    return res.status(400).json({ message: "User already exists" })
 
  if(isValidValue(username) && isValidValue(password)){
    await createUser(username, password)
    res.json({ message: "User registered" })
  }else return res.status(400).json({ message: "Invalid enter" })
})
function isValidValue(value){
  if(value.indexOf(" ") !== -1 || value.length < 5 || value.length > 12){
    return false
  }else return true
}



//login
app.post('/api/login', async (req, res) => { 
  const { username, password } = req.body
  const user = await findUser(username)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
 
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })
 
  const accessToken = jwt.sign(
    { username },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  )
  const refreshToken = jwt.sign(
    { username },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES }
  )

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_EXPIRES*1000
  })
 
  return res.json({ accessToken })
})

app.post('/api/clear', (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json({message:"No refresh token"})
    res.clearCookie("refreshToken")
    res.end()
})


function authMiddleware(req, res, next) { 
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401).json({ message: "No access token" })
 
  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({message:"Invalid token"})
    req.user = user
    next()
  })
}

app.post("/api/refresh", (req,res) => { 
  const refreshToken = req.cookies.refreshToken

  if(!refreshToken) return res.status(401).json({message:"No refresh token"})
  
  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if(err) return res.status(403).json({message:"Invalid refresh token"})

    const newAccessToken = jwt.sign(
      { username: user.username },
      ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRES }
    )
    return res.json({accessToken: newAccessToken})
  })
})

app.post("/api/isAuth", (req, res) => {
   const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json({message:"No refresh token"})
    
    jwt.verify(refreshToken, REFRESH_SECRET, (err) => {
    if(err) return res.status(403).json({message:"Invalid refresh token"})
      else return res.sendStatus(200)
    })
})


app.post("/api/user", authMiddleware, async (req, res) => {
  const user = await getUser(req.body.username)
  if(!user) return res.status(401).json({message: "User was not found"})
  return res.status(200).json(user)
})

app.get("/api/username", authMiddleware, (req,res) => {
  res.json({ username: req.user.username })
})

app.post("/api/deleteUser", authMiddleware, async (req, res) => {
  const isDeleted = await deleteUser(req.body.username)
  if(!isDeleted) return res.status(403).json({message: "User was not deleted"})
  return res.status(200).json({message: "User was deleted"})
})

app.post("/api/updateUser", authMiddleware, async (req, res) => {
  const {username, newUsername, newBio} = req.body
  const userData = {username: username, newUsername: newUsername, newBio: newBio}
  
  if(!isValidValue(userData.newUsername)) return res.status(403).json({message: "Invalid user data"})

  const isUpdated = await updateUser(userData) 
  if(isUpdated){
    const refreshToken = jwt.sign(
      { username: userData.newUsername },
      REFRESH_SECRET,
      { expiresIn: REFRESH_EXPIRES }
    )

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_EXPIRES*1000
    })

    return res.status(200).json({message: "User was updated"})
  }else return res.status(400).json({message: "User was not updated"})
})

app.post("/api/updatePass", authMiddleware, async (req,res) => {
  const { username, password, newPassword } = req.body
  const user = await findUser(username)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
 
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })
 
  const isUpdated = await updatePass(username, newPassword)
  if(isUpdated) return res.status(200).json({message: "Password was changed"})
    else return res.status(403).json({message: "Password was not changed"})
})

//community-page
app.get("/api/posts", authMiddleware, async (req, res) => {
  const posts = await getPosts()
  if(!posts) return res.status(500).json({message:"no posts"}) //^^

  return res.json(posts)
})

app.post("/api/addPost", authMiddleware, async (req, res) => {
  const { author, title, description, date } = req.body
  const post = {author: author, title: title, description: description, date: date}
  await addPost(post)//! add some validation
  return res.status(200).json({message: "Post was added"})
})

app.post("/api/deletePost", authMiddleware, async (req,res) => {
  const {postID} = req.body
  const id = {id: postID}
  await deletePost(id)
  return res.status(200).json({message: "Post was deleted"})
})

app.post("/api/updatePost", authMiddleware, async (req,res) => {
  const { author, title, description, id } = req.body 
  const isUpdated = await updatePost(title, description, author, id)//! add some validation
  if(isUpdated) return res.status(200).json({message: "Post was updated"})
    else return res.status(403).json({message: "Post was not updated"})
})

app.post("/api/starPost", authMiddleware, async (req,res) => {
  const { postID, username, stars} = req.body
  const isStarred = await starPost(postID, username, stars)
  if(isStarred) return res.status(200).json({message:"Post stars were updated"})
    else return res.status(403).json({message: "Post stars were not updated"})
})

app.post("/api/comment", authMiddleware, async(req,res) =>{
  const {postID, text, author, date} = req.body
  const isAdded = await addComment(postID, author, date, text)
  if(isAdded) return res.status(200).json({message: "Comment was added"})
    else return res.status(403).json({message: "Comment was not added"})
})