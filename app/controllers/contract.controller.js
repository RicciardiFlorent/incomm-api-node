const Contract = require("../models/contract.model.js");

// Create and Save a new Contract
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Contract
    const contract = new Contract({
      name: req.body.name,
    });
  
    // Save Contract in the database
    Contract.create(contract, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Contract."
        });
      else res.send(data);
    });
  };

// Retrieve all Contracts from the database.
exports.findAll = (req, res) => {
    Contract.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contracts."
        });
      else res.send(data);
    });
  };

// Find a single Contract with a contractId
exports.findOne = (req, res) => {
    Contract.findById(req.params.contractId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contract with id ${req.params.contractId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Contract with id " + req.params.contractId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Contract with a contractId
exports.findOneByName = (req, res) => {
    Contract.findByName(req.params.contractName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contract with name ${req.params.contractName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Contract with name " + req.params.contractName
          });
        }
      } else res.send(data);
    });
  };


// Update a Contract identified by the contractId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Contract.updateById(
      req.params.contractId,
      new Contract(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Contract with id ${req.params.contractId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Contract with id " + req.params.contractId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Contract with the specified contractId in the request
exports.delete = (req, res) => {
    Contract.remove(req.params.contractId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contract with id ${req.params.contractId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Contract with id " + req.params.contractId
          });
        }
      } else res.send({ message: `Contract was deleted successfully!` });
    });
  };
// Delete all Contracts from the database.
exports.deleteAll = (req, res) => {
    Contract.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all contracts."
        });
      else res.send({ message: `All Contracts were deleted successfully!` });
    });
  };