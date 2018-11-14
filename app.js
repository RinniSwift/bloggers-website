const express = require('express')
const app = express()

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/contractor-project', {
	useNewUrlParser: true
});


// initialize body-parser and add to app
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


const Post = require('./models/post');
const Comment = require('./models/comment');
const posts = require('./controllers/posts')(app, Post, Comment);
const comments = require('./controllers/comments')(app, Comment);

// mock array of blog posts
// let posts = [
// 	{ title: "How to become rich", content: "persistence is key to becoming rich"},
// 	{ title: "My life in a year", content: "happiness is the main key in life"}
// ]

const port = process.env.PORT || 3000;
app.listen(port)
