const Comment = require("../models/comments.model.js");

// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Comment
    const comment = new Comment({
      comment_id: req.body.comment_id,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      text: req.body.text,
      posted_at: req.body.posted_at
    });
  
    // Save Comment in the database
    Comment.create(comment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment."
        });
      else res.send(data);
    });
  };

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
    Comment.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      else res.send(data);
    });
  };

  
// Find a single Comment with a commentId
exports.findOne = (req, res) => {
    Comment.findById(req.params.comment_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.comment_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Comment with id " + req.params.comment_id
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Comment with a commentId
exports.findAllByPostId = (req, res) => {
    Comment.findByPostId(req.params.post_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.send(null);
        } else {
          res.status(500).send({
            message: "Error retrieving Comment with id " + req.params.post_id
          });
        }
      } else res.send(data);
    });
  };



// Delete a Comment with the specified commentId in the request
exports.delete = (req, res) => {
    Comment.remove(req.params.comment_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.comment_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Comment with id " + req.params.comment_id
          });
        }
      } else res.send({ message: `Comment was deleted successfully!` });
    });
  };
// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
    Comment.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all comments."
        });
      else res.send({ message: `All Comments were deleted successfully!` });
    });
  };