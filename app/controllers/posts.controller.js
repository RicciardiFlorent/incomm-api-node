const Post = require("../models/posts.model.js");

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Post
    const post = new Post({
      employee_id: req.body.employee_id,
      media_id: req.body.media_id,
      posted_at: req.body.posted_at,
      author: req.body.author,
      content: req.body.content

    });
  
    // Save Post in the database
    Post.create(post, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post."
        });
      else res.send(data);
    });
  };

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      else res.send(data);
    });
  };

// Find a single Post with a postId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Post with id " + req.params.postId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Post with a postId
exports.findOneByName = (req, res) => {
    Post.findByName(req.params.postName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with name ${req.params.postName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Post with name " + req.params.postName
          });
        }
      } else res.send(data);
    });
  };


// Update a Post identified by the postId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Post.updateById(
      req.params.postId,
      new Post(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Post with id ${req.params.postId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Post with id " + req.params.postId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Post with the specified postId in the request
exports.delete = (req, res) => {
    Post.remove(req.params.postId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Post with id " + req.params.postId
          });
        }
      } else res.send({ message: `Post was deleted successfully!` });
    });
  };
// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Post.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all posts."
        });
      else res.send({ message: `All Posts were deleted successfully!` });
    });
  };