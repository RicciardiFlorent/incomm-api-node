module.exports = app => {
    const offer = require("../controllers/offers.controller.js");
  
    // Create a new Offer
    app.post("/offer", offer.create);
  
    // Retrieve all Offers
    app.get("/offer", offer.findAll);
  
    // Retrieve a single Offer with offerId
    app.get("/offer/:offerId", offer.findOne);
  
    // Update a Offer with offerId
    app.put("/offer/:offerId", offer.update);
  
    // Delete a Offer with offerId
    app.delete("/offer/:offerId", offer.delete);
  
    // Create a new Offer
    app.delete("/offer", offer.deleteAll);

    app.get("/nbOffers", offer.getNbOffers)
  };