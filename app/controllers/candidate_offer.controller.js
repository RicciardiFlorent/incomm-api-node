const Candidate_Offer = require("../models/candidate_offer.model.js");

// Create and Save a new Candidate_Offer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Candidate_Offer
    const candidate_offer = new Candidate_Offer({
      candidate_id: req.body.candidate_id,
      offer_id: req.body.offer_id,
    });
  
    // Save Candidate_Offer in the database
    Candidate_Offer.create(candidate_offer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Candidate_Offer."
        });
      else res.send(data);
    });
  };

// Retrieve all Candidate_Offers from the database.
exports.findAll = (req, res) => {
    Candidate_Offer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving candidate_offers."
        });
      else res.send(data);
    });
  };

// Find a single Candidate_Offer with a candidate_offerId
exports.findOne = (req, res) => {
    Candidate_Offer.findById(req.params.candidate_offerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Candidate_Offer with id ${req.params.candidate_offerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Candidate_Offer with id " + req.params.candidate_offerId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Candidate_Offer with a candidate_offerId
exports.findOneByName = (req, res) => {
    Candidate_Offer.findByName(req.params.candidate_offerName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Candidate_Offer with name ${req.params.candidate_offerName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Candidate_Offer with name " + req.params.candidate_offerName
          });
        }
      } else res.send(data);
    });
  };


// Update a Candidate_Offer identified by the candidate_offerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Candidate_Offer.updateById(
      req.params.candidate_offerId,
      new Candidate_Offer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Candidate_Offer with id ${req.params.candidate_offerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Candidate_Offer with id " + req.params.candidate_offerId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Candidate_Offer with the specified candidate_offerId in the request
exports.delete = (req, res) => {
    Candidate_Offer.remove(req.params.candidate_offerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Candidate_Offer with id ${req.params.candidate_offerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Candidate_Offer with id " + req.params.candidate_offerId
          });
        }
      } else res.send({ message: `Candidate_Offer was deleted successfully!` });
    });
  };
// Delete all Candidate_Offers from the database.
exports.deleteAll = (req, res) => {
    Candidate_Offer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all candidate_offers."
        });
      else res.send({ message: `All Candidate_Offers were deleted successfully!` });
    });
  };