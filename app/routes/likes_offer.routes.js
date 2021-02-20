module.exports = app => {
    const like = require("../controllers/likes_offer.controller");
  
    // Create a new Like
    app.post("/likeOffer", like.create);
  
    // Retrieve all Likes
    app.get("/likesOffer", like.findAll);
  
    // Retrieve a single Like with likeId
    app.get("/likeOffer/:like_offer_id", like.findOne);

    // Retrieve a single Like with likeId
    app.get("/likesOffer/:offer_id", like.findAllByOfferId);
    
    // Retrieve single Like with likeId
    app.get("/likesOffer/user/:user_id", like.findAllByUserId);

    // Delete a Like with likeId
    app.delete("/likeOffer/:offer_id/:user_id", like.delete);
  
    // delete all
    app.delete("/likesOffer", like.deleteAll);
  };