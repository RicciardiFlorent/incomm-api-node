const sql = require("./db.js");

// constructor
const Like = function(like) {
    this.like_offer_id= like.like_offer_id;
    this.user_id= like.user_id;
    this.offer_id= like.offer_id;
  };
  
  Like.create = (newLike, result) => {
    console.log(newLike)
    sql.query("INSERT INTO likes_offer SET ?", newLike, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created like: ", { like_offer_id: res.insertId, ...newLike });
      result(null, { id: res.insertId, ...newLike });
    });
  };
  
  Like.findById = (likeId, result) => {
    sql.query(`SELECT * FROM likes_offer WHERE like_offer_id = ${likeId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found like: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Like with the id
      result({ kind: "not_found" }, null);
    });
  };

  
  Like.findOfferByUserId = ( userID , result) => {
    sql.query(`SELECT * FROM likes_offer WHERE user_id=${userID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found like: ", res);
        result(null, res);
        return;
      }
  
      // not found Like with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Like.findByOfferId = (offerID, result) => {
    sql.query(`SELECT * FROM likes_offer WHERE offer_id = ${offerID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found like: ", res);
        result(null, res);
        return;
      }
  
      // not found Like with the id
      result({ kind: "not_found" }, "tsrs");
    });
  };


  Like.findByOfferIdAndUserId = (offerID, userID , result) => {
    sql.query(`SELECT * FROM likes_offer WHERE offer_id = ${offerID} and user_id=${userID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found like: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Like with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Like.getAll = result => {
    sql.query("SELECT * FROM likes_offer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("likes: ", res);
      result(null, res);
    });
  };

    
  Like.getAllByUserID = (userID, result) => {
    sql.query("SELECT * FROM likes_offer WHERE user_id= ?", userID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("likes: ", res);
      result(null, res);
    });
  };

  Like.getAllByUserIDAndOfferID = (userID, offerID, result) => {
    sql.query("SELECT * FROM likes_offer WHERE user_id= '?' and offer_id = '?'", userID,offerID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("likes: ", res);
      result(null, res);
    });
  };
  
  
  
  Like.remove = (offer_id, user_id, result) => {
    sql.query("DELETE FROM likes_offer WHERE offer_id = ? AND user_id = ?", [offer_id, user_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Like with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted like with like_offer_id: ", offer_id);
      result(null, res);
    });
  };
  
  Like.removeAll = result => {
    sql.query("DELETE FROM likes_offer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} likes`);
      result(null, res);
    });
  };
  
  module.exports = Like;