module.exports = app => {
    const company = require("../controllers/companies.controller.js");
  
    // Create a new Companie
    app.post("/company", company.create);
  
    // Retrieve all Companies
    app.get("/company", company.findAll);
  
    // Retrieve a single Companie with companyId
    app.get("/company/:companieId", company.findOne);

    // Retrieve a company with the name
    app.get("/company/name/:companieName", company.findOneByName)

    // Retrieve employees
    app.get("/company/:companyId/employees", company.getAllEmployee)
  
    // Update a Companie with companyId
    app.put("/company/:companieId", company.update);
  
    // Delete a Companie with companyId
    app.delete("/company/:companieId", company.delete);

    //get company by id employee
    app.get("/company/companyByEmployee/:employeeId", company.findByEmployeeId)

    //get company from user id
    app.get("/company/companyByUser/:userId", company.findByUserId);

    // Create a new Companie
    app.delete("/company", company.deleteAll);

    app.post("/company/:companieId/img", company.updateImage);

    app.get("/company/:companieId/img", company.getImageByID)
    
    app.get("/company-random", company.getRandom)

  };