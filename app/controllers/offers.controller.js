const Offer = require("../models/offers.model.js");

// Create and Save a new Offer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Offer
    const offer = new Offer({
      contract_id: req.body.contract_id,
      employee_id: req.body.employee_id,
      posted_at: req.body.posted_at,
      content: req.body.content,
      title: req.body.title,
      fast_apply: req.body.fast_apply,
      url: req.body.url,
      salary: req.body.salary,
      city: req.body.city,
      department: req.body.department,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      offer_sector_id: req.body.offer_sector_id,
      company_id: req.body.company_id
    });
  
    // Save Offer in the database
    Offer.create(offer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Offer."
        });
      else res.send(data);
    });
  };

// Retrieve all Offers from the database.
exports.findAll = (req, res) => {
    Offer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving offers."
        });
      else res.send(data);
    });
  };

  exports.getNbOffers = (req, res) => {
    Offer.getNbOffers((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving offers."
        });
      else res.send(data);
    });
  }

  // Find a single Offer with a offerId
exports.findAllByCompany = (req, res) => {
  Offer.getAllByCompany(req.params.company_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status.send({
          message: `Not found Offer with company_id ${req.params.company_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Offer with company_id " + req.params.company_id
        });
      }
    } else res.send(data);
  });
};


// Find a single Offer with a offerId
exports.findOne = (req, res) => {
    Offer.findById(req.params.offerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Offer with id ${req.params.offerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Offer with id " + req.params.offerId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Offer with a offerId
exports.findOneByName = (req, res) => {
    Offer.findByName(req.params.offerName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Offer with name ${req.params.offerName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Offer with name " + req.params.offerName
          });
        }
      } else res.send(data);
    });
  };


// Update a Offer identified by the offerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Offer.updateById(
      req.params.offerId,
      new Offer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Offer with id ${req.params.offerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Offer with id " + req.params.offerId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a Offer with the specified offerId in the request
exports.delete = (req, res) => {
    Offer.remove(req.params.offerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Offer with id ${req.params.offerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Offer with id " + req.params.offerId
          });
        }
      } else res.send({ message: `Offer was deleted successfully!` });
    });
  };
// Delete all Offers from the database.
exports.deleteAll = (req, res) => {
    Offer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all offers."
        });
      else res.send({ message: `All Offers were deleted successfully!` });
    });
  };