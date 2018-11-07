const express = require('express')
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor-project');

const Post = mongoose.model('Post', {
	title: String,
	content: String
});

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mock array of blog posts
// let posts = [
// 	{ title: "How to become rich", content: "persistence is key to becoming rich"},
// 	{ title: "My life in a year", content: "happiness is the main key in life"}
// ]

//INDEX
app.get('/posts', (req, res) => {
	res.render('posts-index', {posts: posts})
})

app.get('/', (req, res) => {
	Post.find()
		.then(posts => {
			res.render('posts-index', {posts: posts});
		})
		.catch(err => {
			console.log(err);
		})
})

app.listen(3000, () => {
	console.log('App listening on port 3000!')
})