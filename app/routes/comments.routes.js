module.exports = app => {
    const comment = require("../controllers/comments.controller.js");
  
    // Create a new Comment
    app.post("/comment", comment.create);
  
    // Retrieve all Comments
    app.get("/comments", comment.findAll);
  
    // Retrieve a single Comment with commentId
    app.get("/comment/:comment_id", comment.findOne);

    // Retrieve a single Comment with commentId
    app.get("/comments/:post_id", comment.findAllByPostId);

    // Delete a Comment with commentId
    app.delete("/comment/:comment_id", comment.delete);
  
    // delete all
    app.delete("/comment", comment.deleteAll);
  };