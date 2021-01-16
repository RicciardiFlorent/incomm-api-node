module.exports = app => {
    const candidate_offer = require("../controllers/candidate_offer.controller.js");
  
    // Create a new Media
    app.post("/candidate_offer", candidate_offer.create);
  
    // Retrieve all Medias
    app.get("/candidate_offer", candidate_offer.findAll);
  
    // Retrieve a single Media with candidate_offerId
    app.get("/candidate_offer/:candidate_offerId", candidate_offer.findOne);
  
    // Update a Media with candidate_offerId
    app.put("/candidate_offer/:candidate_offerId", candidate_offer.update);
  
    // Delete a Media with candidate_offerId
    app.delete("/candidate_offer/:candidate_offerId", candidate_offer.delete);
  
    // Create a new Media
    app.delete("/candidate_offer", candidate_offer.deleteAll);
  };