module.exports = app => {
    const current_situation = require("../controllers/current_situations.controller.js");
  
    // Create a new Media
    app.post("/current_situation", current_situation.create);
  
    // Retrieve all Medias
    app.get("/current_situation", current_situation.findAll);
  
    // Retrieve a single Media with current_situationId
    app.get("/current_situation/:current_situationId", current_situation.findOne);
  
    // Update a Media with current_situationId
    app.put("/current_situation/:current_situationId", current_situation.update);
  
    // Delete a Media with current_situationId
    app.delete("/current_situation/:current_situationId", current_situation.delete);
  
    // Create a new Media
    app.delete("/current_situation", current_situation.deleteAll);
  };