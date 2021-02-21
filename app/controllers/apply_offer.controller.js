const Apply_Offer = require("../models/apply_offer.model.js");

// Create and Save a new Apply_Offer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Apply_Offer
    const apply_offer = new Apply_Offer({
      apply_offer_id: req.body.apply_offer_id,
      offer_id: req.body.offer_id,
      user_id: req.body.user_id,
      company_id: req.body.company_id,
      content: req.body.content,
      date: req.body.date,
      cv: req.body.cv,
    });
  
    // Save Apply_Offer in the database
    Apply_Offer.create(apply_offer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Apply_Offer."
        });
      else res.send(data);
    });
  };

// Retrieve all Apply_Offers from the database.
exports.findAll = (req, res) => {
    Apply_Offer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving apply_offer."
        });
      else res.send(data);
    });
  };

  // Retrieve all Apply_Offers from the database.
exports.findByUserIDandOfferID = (req, res) => {
  Apply_Offer.getByOfferIDandUserID((req.params.offer_id, req.params.user_id),(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Apply_Offer with id ${req.params.offer_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Apply_Offer with id " + req.params.offer_id
        });
      }
    } else res.send(data);
  });
};

// Find a single Apply_Offer with a apply_offerId
exports.findOne = (req, res) => {
    Apply_Offer.findById(req.params.apply_offer_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Apply_Offer with id ${req.params.apply_offer_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Apply_Offer with id " + req.params.apply_offer_id
          });
        }
      } else res.send(data);
    });
  };
  


// Delete a Apply_Offer with the specified apply_offerId in the request
exports.delete = (req, res) => {
    Apply_Offer.remove(req.params.apply_offer_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Apply_Offer with id ${req.params.apply_offer_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Apply_Offer with id " + req.params.apply_offer_id
          });
        }
      } else res.send({ message: `Apply_Offer was deleted successfully!` });
    });
  };
// Delete all Apply_Offers from the database.
exports.deleteAll = (req, res) => {
    Apply_Offer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all apply_offer."
        });
      else res.send({ message: `All Apply_Offers were deleted successfully!` });
    });
  };