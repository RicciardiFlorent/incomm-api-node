const Cv = require("../models/cv.model.js");

// Create and Save a new Cv
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Cv
    const cv = new Cv({
      name: req.body.name,
      upload_date: req.body.upload_date,
      url: req.body.url
    });
  
    // Save Cv in the database
    Cv.create(cv, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Cv."
        });
      else res.send(data);
    });
  };

// Retrieve all Cvs from the database.
exports.findAll = (req, res) => {
    Cv.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cvs."
        });
      else res.send(data);
    });
  };

// Find a single Cv with a cvId
exports.findOne = (req, res) => {
    Cv.findById(req.params.cvId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cv with id ${req.params.cvId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Cv with id " + req.params.cvId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Cv with a cvId
exports.findOneByName = (req, res) => {
    Cv.findByName(req.params.cvName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cv with name ${req.params.cvName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Cv with name " + req.params.cvName
          });
        }
      } else res.send(data);
    });
  };


// Update a Cv identified by the cvId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Cv.updateById(
      req.params.cvId,
      new Cv(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cv with id ${req.params.cvId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Cv with id " + req.params.cvId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Cv with the specified cvId in the request
exports.delete = (req, res) => {
    Cv.remove(req.params.cvId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cv with id ${req.params.cvId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Cv with id " + req.params.cvId
          });
        }
      } else res.send({ message: `Cv was deleted successfully!` });
    });
  };
// Delete all Cvs from the database.
exports.deleteAll = (req, res) => {
    Cv.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cvs."
        });
      else res.send({ message: `All Cvs were deleted successfully!` });
    });
  };