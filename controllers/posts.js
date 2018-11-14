
module.exports = function(app, Post, Comment) {
	app.get('/', (req, res) => {
		Post.find()
			.then(posts => {
				res.render('posts-index', {posts: posts});
			})
			.catch(err => {
				console.log(err);
			});
	});


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
    Comment.find({postId: req.params.id}).then((comments) => {
      res.render('posts-show', { post: post, comments: comments })
    }).catch(err => {
      console.log(err.message)
    })
    
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

}