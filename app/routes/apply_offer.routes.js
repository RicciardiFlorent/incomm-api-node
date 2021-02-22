module.exports = app => {
    const apply_offer = require("../controllers/apply_offer.controller.js");
  
    // Create a new Candidate
    app.post("/apply_offer", apply_offer.create);
  
    // Retrieve all Candidates
    app.get("/apply_offer", apply_offer.findAll);

    app.get("/apply_offer/company/:company_id", apply_offer.findByCompanyID);
    
    // Retrieve all Candidates
    app.get("/apply_offer/:user_id/:offer_id", apply_offer.findByUserIDandOfferID);
  
  
    // Delete a Candidate with apply_offerId
    app.delete("/apply_offer/:apply_offerId", apply_offer.delete);
  
    // Create a new Candidate
    app.delete("/apply_offer", apply_offer.deleteAll);
  };