module.exports = app => {
    const company = require("../controllers/companies.controller.js");
  
    // Create a new Companie
    app.post("/company", company.create);
  
    // Retrieve all Companies
    app.get("/company", company.findAll);
  
    // Retrieve a single Companie with companyId
    app.get("/company/:companyId", company.findOne);
  
    // Update a Companie with companyId
    app.put("/company/:companyId", company.update);
  
    // Delete a Companie with companyId
    app.delete("/company/:companyId", company.delete);
  
    // Create a new Companie
    app.delete("/company", company.deleteAll);
  };