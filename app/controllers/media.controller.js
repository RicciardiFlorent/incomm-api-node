const Media = require("../models/media.model.js");

// Create and Save a new Media
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Media
    const media = new Media({
      title: req.body.title,
      type: req.body.type,
      url: req.body.url
    });
  
    // Save Media in the database
    Media.create(media, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Media."
        });
      else res.send(data);
    });
  };

// Retrieve all Medias from the database.
exports.findAll = (req, res) => {
    Media.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving medias."
        });
      else res.send(data);
    });
  };

// Find a single Media with a mediaId
exports.findOne = (req, res) => {
    Media.findById(req.params.mediaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Media with id ${req.params.mediaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Media with id " + req.params.mediaId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Media with a mediaId
exports.findOneByName = (req, res) => {
    Media.findByName(req.params.mediaName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Media with name ${req.params.mediaName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Media with name " + req.params.mediaName
          });
        }
      } else res.send(data);
    });
  };


// Update a Media identified by the mediaId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Media.updateById(
      req.params.mediaId,
      new Media(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Media with id ${req.params.mediaId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Media with id " + req.params.mediaId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Media with the specified mediaId in the request
exports.delete = (req, res) => {
    Media.remove(req.params.mediaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Media with id ${req.params.mediaId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Media with id " + req.params.mediaId
          });
        }
      } else res.send({ message: `Media was deleted successfully!` });
    });
  };
// Delete all Medias from the database.
exports.deleteAll = (req, res) => {
    Media.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all medias."
        });
      else res.send({ message: `All Medias were deleted successfully!` });
    });
  };