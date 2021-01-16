module.exports = app => {
    const offer_sector = require("../controllers/offer_sectors.controller.js");
  
    // Create a new Media
    app.post("/offer_sector", offer_sector.create);
  
    // Retrieve all Medias
    app.get("/offer_sector", offer_sector.findAll);
  
    // Retrieve a single Media with offer_sectorId
    app.get("/offer_sector/:offer_sectorId", offer_sector.findOne);
  
    // Update a Media with offer_sectorId
    app.put("/offer_sector/:offer_sectorId", offer_sector.update);
  
    // Delete a Media with offer_sectorId
    app.delete("/offer_sector/:offer_sectorId", offer_sector.delete);
  
    // Create a new Media
    app.delete("/offer_sector", offer_sector.deleteAll);
  };