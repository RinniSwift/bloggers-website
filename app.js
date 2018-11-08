const express = require('express')
const app = express()

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/contractor-project', {
	useNewUrlParser: true
});

const Post = require('./models/post');

const posts = require('./controllers/posts')(app, Post);


// initialize body-parser and add to app
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mock array of blog posts
// let posts = [
// 	{ title: "How to become rich", content: "persistence is key to becoming rich"},
// 	{ title: "My life in a year", content: "happiness is the main key in life"}
// ]

//INDEX
app.get('/', (req, res) => {
	Post.find()
		.then(posts => {
			res.render('posts-index', {posts: posts});
		})
		.catch(err => {
			console.log(err);
		})
})

app.get('/posts', (req, res) => {
	res.render('posts-index', {posts: posts})
})

app.get('/posts/new', (req, res) => {
	res.render('posts-new', {});
})

app.get('/posts/:id/edit', (req, res) => {
	Post.findById(req.params.id, function(err, post) {
		res.render('posts-edit', {post : post});
	})
})

// create
app.post('/posts', (req, res) => {
	    // we use the method create() to create the review
	    Post.create(req.body).then((post) => {
	        console.log(post);
	        // then we redirect to reviews/:id
	        res.redirect(`/posts/${post._id}`);
	    }).catch((err) => {
	        console.log(err.message);
	    })
	})

app.get('/posts/:id', (req, res) => {
	Post.findById(req.params.id).then((post) => {
		res.render('posts-show', { post: post })
	}).catch((err) => {
		console.log(err.message);
	})
})

// UPDATE
app.put('/posts/:id', (req, res) => {
	Post.findByIdAndUpdate(req.params.id, req.body)
		.then(post => {
			res.redirect(`/posts/${post._id}`)
		})
		.catch(err => {
			console.log(err.message)
		})
})

app.delete('/posts/:id', function (req, res){
	console.log("delete post")
	Post.findByIdAndRemove(req.params.id).then((post) => {
		res.redirect('/');
	}).catch((err) => {
		console.log(err.message);
	})
})

const port = process.env.PORT || 3000;
app.listen(port)
