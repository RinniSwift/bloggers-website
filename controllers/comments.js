
module.exports = (app, Comment) => {

  // NEW Comment
  app.post('/posts/comments', (req, res) => {
  	console.log(req.body)
  Comment.create(req.body).then(comment => {
    res.redirect(`/posts/${comment.postId}`);
  }).catch((err) => {
    console.log(err);
  });
});

}