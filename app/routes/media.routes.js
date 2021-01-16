module.exports = app => {
    const media = require("../controllers/media.controller.js");
  
    // Create a new Media
    app.post("/media", media.create);
  
    // Retrieve all Medias
    app.get("/media", media.findAll);
  
    // Retrieve a single Media with mediaId
    app.get("/media/:mediaId", media.findOne);
  
    // Update a Media with mediaId
    app.put("/media/:mediaId", media.update);
  
    // Delete a Media with mediaId
    app.delete("/media/:mediaId", media.delete);
  
    // Create a new Media
    app.delete("/media", media.deleteAll);
  };