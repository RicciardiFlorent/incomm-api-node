const Current_Situation = require("../models/current_situations.model.js");

// Create and Save a new Current_Situation
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Current_Situation
    const current_situation = new Current_Situation({
      name: req.body.name
    });
  
    // Save Current_Situation in the database
    Current_Situation.create(current_situation, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Current_Situation."
        });
      else res.send(data);
    });
  };

// Retrieve all Current_Situations from the database.
exports.findAll = (req, res) => {
    Current_Situation.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving current_situations."
        });
      else res.send(data);
    });
  };

// Find a single Current_Situation with a current_situationId
exports.findOne = (req, res) => {
    Current_Situation.findById(req.params.current_situationId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Current_Situation with id ${req.params.current_situationId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Current_Situation with id " + req.params.current_situationId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Current_Situation with a current_situationId
exports.findOneByName = (req, res) => {
    Current_Situation.findByName(req.params.current_situationName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Current_Situation with name ${req.params.current_situationName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Current_Situation with name " + req.params.current_situationName
          });
        }
      } else res.send(data);
    });
  };


// Update a Current_Situation identified by the current_situationId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Current_Situation.updateById(
      req.params.current_situationId,
      new Current_Situation(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Current_Situation with id ${req.params.current_situationId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Current_Situation with id " + req.params.current_situationId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Current_Situation with the specified current_situationId in the request
exports.delete = (req, res) => {
    Current_Situation.remove(req.params.current_situationId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Current_Situation with id ${req.params.current_situationId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Current_Situation with id " + req.params.current_situationId
          });
        }
      } else res.send({ message: `Current_Situation was deleted successfully!` });
    });
  };
// Delete all Current_Situations from the database.
exports.deleteAll = (req, res) => {
    Current_Situation.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all current_situations."
        });
      else res.send({ message: `All Current_Situations were deleted successfully!` });
    });
  };