const Offer_Sector = require("../models/offer_sectors.model.js");

// Create and Save a new Offer_Sector
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Offer_Sector
    const offer_sector = new Offer_Sector({
      name: req.body.name,
    });
  
    // Save Offer_Sector in the database
    Offer_Sector.create(offer_sector, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Offer_Sector."
        });
      else res.send(data);
    });
  };

// Retrieve all Offer_Sectors from the database.
exports.findAll = (req, res) => {
    Offer_Sector.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving offer_sectors."
        });
      else res.send(data);
    });
  };

// Find a single Offer_Sector with a offer_sectorId
exports.findOne = (req, res) => {
    Offer_Sector.findById(req.params.offer_sectorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Offer_Sector with id ${req.params.offer_sectorId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Offer_Sector with id " + req.params.offer_sectorId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Offer_Sector with a offer_sectorId
exports.findOneByName = (req, res) => {
    Offer_Sector.findByName(req.params.offer_sectorName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Offer_Sector with name ${req.params.offer_sectorName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Offer_Sector with name " + req.params.offer_sectorName
          });
        }
      } else res.send(data);
    });
  };


// Update a Offer_Sector identified by the offer_sectorId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Offer_Sector.updateById(
      req.params.offer_sectorId,
      new Offer_Sector(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Offer_Sector with id ${req.params.offer_sectorId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Offer_Sector with id " + req.params.offer_sectorId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Offer_Sector with the specified offer_sectorId in the request
exports.delete = (req, res) => {
    Offer_Sector.remove(req.params.offer_sectorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Offer_Sector with id ${req.params.offer_sectorId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Offer_Sector with id " + req.params.offer_sectorId
          });
        }
      } else res.send({ message: `Offer_Sector was deleted successfully!` });
    });
  };
// Delete all Offer_Sectors from the database.
exports.deleteAll = (req, res) => {
    Offer_Sector.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all offer_sectors."
        });
      else res.send({ message: `All Offer_Sectors were deleted successfully!` });
    });
  };