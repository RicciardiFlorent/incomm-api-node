module.exports = app => {
    const post = require("../controllers/posts.controller.js");
  
    // Create a new Post
    app.post("/post", post.create);
  
    // Retrieve all Posts
    app.get("/post", post.findAll);
  
    // Retrieve a single Post with postId
    app.get("/post/:postId", post.findOne);
  
    // Update a Post with postId
    app.put("/post/:postId", post.update);
  
    // Delete a Post with postId
    app.delete("/post/:postId", post.delete);
  
    // Create a new Post
    app.delete("/post", post.deleteAll);
  };