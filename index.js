//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")
const homeStartingContent =
  "Hello and thank you for stopping by! I’m Peddireddy Ribca Reddy, the voice and creator behind Ribca's Blog. Whether you stumbled across our site by happy accident or were searching for something specific, I’m thrilled to have you here."
const aboutContent = "Hello! I'm P Ribca Reddy, a front-end developer and engineering student specializing in Computer Science with a focus on Artificial Intelligence and Machine Learning at Sathyabama Institute of Science and Technology. \n\n Currently, I am honing my skills in HTML, CSS, JavaScript, and React, among other cutting-edge technologies. My education in CSE with a special focus on AI and ML allows me to appreciate the power of data and the potential of intelligent systems. I am passionate about leveraging this knowledge to enhance user experiences and make interfaces not just interactive, but smart."
const contactContent = "Email ID : pribcareddy@gmail.com"

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

var posts = []
app.get("/", function (req, res) {
  res.render("home", { startingContent: homeStartingContent, posts: posts })
})

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent })
})
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent })
})

app.get("/compose", function (req, res) {
  res.render("compose")
})
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  }
  posts.push(post)
  res.redirect("/")
})

app.get("/posts/:postName", function (req, res) {
  var reqTitle = req.params.postName
  posts.forEach(function (post) {
    if (_.lowerCase(reqTitle) === _.lowerCase(post.title)) {
      res.render("post", { reqTitle: reqTitle, reqBody: post.content })
    }
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000")
})
