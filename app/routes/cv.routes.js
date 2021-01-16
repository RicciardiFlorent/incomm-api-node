module.exports = app => {
    const cvs = require("../controllers/cv.controller.js");
  
    // Create a new CV
    app.post("/cvs", cvs.create);
  
    // Retrieve all CVs
    app.get("/cvs", cvs.findAll);
  
    // Retrieve a single CV with cvId
    app.get("/cvs/:cvId", cvs.findOne);
  
    // Update a CV with cvId
    app.put("/cvs/:cvId", cvs.update);
  
    // Delete a CV with cvId
    app.delete("/cvs/:cvId", cvs.delete);
  
    // Create a new CV
    app.delete("/cvs", cvs.deleteAll);
  };