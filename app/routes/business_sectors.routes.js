module.exports = app => {
    const business_sector = require("../controllers/business_sectors.controller.js");
  
    // Create a new Business_Sector
    app.post("/business_sector", business_sector.create);
  
    // Retrieve all Business_Sectors
    app.get("/business_sector", business_sector.findAll);
  
    // Retrieve a single Business_Sector with business_sectorId
    app.get("/business_sector/:business_sectorId", business_sector.findOne);
  
    // Update a Business_Sector with business_sectorId
    app.put("/business_sector/:business_sectorId", business_sector.update);
  
    // Delete a Business_Sector with business_sectorId
    app.delete("/business_sector/:business_sectorId", business_sector.delete);
  
    // Create a new Business_Sector
    app.delete("/business_sector", business_sector.deleteAll);
  };