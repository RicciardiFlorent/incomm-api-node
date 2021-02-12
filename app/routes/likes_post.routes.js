module.exports = app => {
    const like = require("../controllers/likes_post.controllers");
  
    // Create a new Like
    app.post("/like", like.create);
  
    // Retrieve all Likes
    app.get("/likes", like.findAll);
  
    // Retrieve a single Like with likeId
    app.get("/like/:like_id", like.findOne);

    // Retrieve a single Like with likeId
    app.get("/likes/:post_id", like.findAllByPostId);

    // Delete a Like with likeId
    app.delete("/like/:post_id/:user_id", like.delete);
  
    // delete all
    app.delete("/likes", like.deleteAll);
  };