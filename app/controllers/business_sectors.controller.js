const Business_Sectors = require("../models/business_sectors.model.js");

// Create and Save a new Business_Sectors
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Business_Sectors
    const business_sectors = new Business_Sectors({
      name: req.body.name,
    });
  
    // Save Business_Sectors in the database
    Business_Sectors.create(business_sectors, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Business_Sectors."
        });
      else res.send(data);
    });
  };

// Retrieve all Business_Sectorss from the database.
exports.findAll = (req, res) => {
    Business_Sectors.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving business_sectorss."
        });
      else res.send(data);
    });
  };

// Find a single Business_Sectors with a business_sectorsId
exports.findOne = (req, res) => {
    Business_Sectors.findById(req.params.business_sectorsId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Business_Sectors with id ${req.params.business_sectorsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Business_Sectors with id " + req.params.business_sectorsId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Business_Sectors with a business_sectorsId
exports.findOneByName = (req, res) => {
    Business_Sectors.findByName(req.params.business_sectorsName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Business_Sectors with name ${req.params.business_sectorsName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Business_Sectors with name " + req.params.business_sectorsName
          });
        }
      } else res.send(data);
    });
  };


// Update a Business_Sectors identified by the business_sectorsId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Business_Sectors.updateById(
      req.params.business_sectorsId,
      new Business_Sectors(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Business_Sectors with id ${req.params.business_sectorsId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Business_Sectors with id " + req.params.business_sectorsId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Business_Sectors with the specified business_sectorsId in the request
exports.delete = (req, res) => {
    Business_Sectors.remove(req.params.business_sectorsId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Business_Sectors with id ${req.params.business_sectorsId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Business_Sectors with id " + req.params.business_sectorsId
          });
        }
      } else res.send({ message: `Business_Sectors was deleted successfully!` });
    });
  };
// Delete all Business_Sectorss from the database.
exports.deleteAll = (req, res) => {
    Business_Sectors.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all business_sectorss."
        });
      else res.send({ message: `All Business_Sectorss were deleted successfully!` });
    });
  };