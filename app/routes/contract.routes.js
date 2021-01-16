module.exports = app => {
    const contracts = require("../controllers/contract.controller.js");
  
    // Create a new Contract
    app.post("/contracts", contracts.create);
  
    // Retrieve all Contracts
    app.get("/contracts", contracts.findAll);
  
    // Retrieve a single Contract with contractId
    app.get("/contracts/:contractId", contracts.findOne);
  
    // Update a Contract with contractId
    app.put("/contracts/:contractId", contracts.update);
  
    // Delete a Contract with contractId
    app.delete("/contracts/:contractId", contracts.delete);
  
    // Create a new Contract
    app.delete("/contracts", contracts.deleteAll);
  };