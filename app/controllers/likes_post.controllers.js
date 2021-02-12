const Like = require("../models/likes_post.model.js");

// Create and Save a new Like
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Like
    const like = new Like({
      like_id: req.body.like_id,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    });
  
    // Save Like in the database
    Like.create(like, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Like."
        });
      else res.send(data);
    });
  };

// Retrieve all Likes from the database.
exports.findAll = (req, res) => {
    Like.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving likes."
        });
      else res.send(data);
    });
  };

  
// Find a single Like with a likeId
exports.findOne = (req, res) => {
    Like.findById(req.params.like_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Like with id ${req.params.like_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Like with id " + req.params.like_id
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Like with a likeId
exports.findAllByPostId = (req, res) => {
    Like.findByPostId(req.params.post_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.send([]);
        } else {
          res.status(500).send({
            message: "Error retrieving Like with id " + req.params.post_id
          });
        }
      } else res.send(data);
    });
  };



// Delete a Like with the specified likeId in the request
exports.delete = (req, res) => {
    Like.remove(req.params.post_id, req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Like with id ${req.params.like_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Like with id " + req.params.like_id
          });
        }
      } else res.send({ message: `Like was deleted successfully!` });
    });
  };
// Delete all Likes from the database.
exports.deleteAll = (req, res) => {
    Like.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all likes."
        });
      else res.send({ message: `All Likes were deleted successfully!` });
    });
  };