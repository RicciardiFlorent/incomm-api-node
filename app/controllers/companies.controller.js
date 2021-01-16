const Companie = require("../models/companies.model.js");

// Create and Save a new Companie
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Companie
    const companie = new Companie({
      name: req.body.name,
      referent_lastname: req.body.referent_lastname,
      referent_firstname: req.body.referent_firstname,
      referent_email: req.body.referent_email,
      referent_phone: req.body.referent_phone,
      status: req.body.status,
      business_sector_id: req.body.business_sector_id,
      image: req.body.image
    });
  
    // Save Companie in the database
    Companie.create(companie, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Companie."
        });
      else res.send(data);
    });
  };

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
    Companie.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving companies."
        });
      else res.send(data);
    });
  };

// Find a single Companie with a companieId
exports.findOne = (req, res) => {
    Companie.findById(req.params.companieId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Companie with id ${req.params.companieId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Companie with id " + req.params.companieId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Companie with a companieId
exports.findOneByName = (req, res) => {
    Companie.findByName(req.params.companieName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Companie with name ${req.params.companieName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Companie with name " + req.params.companieName
          });
        }
      } else res.send(data);
    });
  };


// Update a Companie identified by the companieId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Companie.updateById(
      req.params.companieId,
      new Companie(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Companie with id ${req.params.companieId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Companie with id " + req.params.companieId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Companie with the specified companieId in the request
exports.delete = (req, res) => {
    Companie.remove(req.params.companieId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Companie with id ${req.params.companieId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Companie with id " + req.params.companieId
          });
        }
      } else res.send({ message: `Companie was deleted successfully!` });
    });
  };
// Delete all Companies from the database.
exports.deleteAll = (req, res) => {
    Companie.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all companies."
        });
      else res.send({ message: `All Companies were deleted successfully!` });
    });
  };