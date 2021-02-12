const sql = require("./db.js");

// constructor
const Like = function(like) {
    this.like_id= like.like_id;
    this.user_id= like.user_id;
    this.post_id= like.post_id;
  };
  
  Like.create = (newLike, result) => {
    console.log(newLike)
    sql.query("INSERT INTO likes_post SET ?", newLike, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created like: ", { like_id: res.insertId, ...newLike });
      result(null, { id: res.insertId, ...newLike });
    });
  };
  
  Like.findById = (likeId, result) => {
    sql.query(`SELECT * FROM likes_post WHERE like_id = ${likeId}`, (err, res) => {
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
  
  Like.findByPostId = (postID, result) => {
    sql.query(`SELECT * FROM likes_post WHERE post_id = ${postID}`, (err, res) => {
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
  
  Like.getAll = result => {
    sql.query("SELECT * FROM likes_post", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("likes: ", res);
      result(null, res);
    });
  };
  
  
  
  Like.remove = (post_id, user_id, result) => {
    sql.query("DELETE FROM likes_post WHERE post_id = ? AND user_id = ?", [post_id, user_id], (err, res) => {
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
  
      console.log("deleted like with like_id: ", post_id);
      result(null, res);
    });
  };
  
  Like.removeAll = result => {
    sql.query("DELETE FROM likes_post", (err, res) => {
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