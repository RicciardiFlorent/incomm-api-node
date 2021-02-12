const sql = require("./db.js");

// constructor
const Comment = function(comment) {
    this.comment_id= comment.comment_id;
    this.user_id= comment.user_id;
    this.post_id= comment.post_id;
    this.text= comment.text;
    this.posted_at= comment.posted_at;
  };
  
  Comment.create = (newComment, result) => {
    console.log(newComment)
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created comment: ", { comment_id: res.insertId, ...newComment });
      result(null, { id: res.insertId, ...newComment });
    });
  };
  
  Comment.findById = (commentId, result) => {
    sql.query(`SELECT * FROM comments WHERE comment_id = ${commentId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found comment: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Comment with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Comment.findByPostId = (postID, result) => {
    sql.query(`SELECT * FROM comments WHERE post_id = ${postID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found comment: ", res);
        result(null, res);
        return;
      }
  
      // not found Comment with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Comment.getAll = result => {
    sql.query("SELECT * FROM comments", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("comments: ", res);
      result(null, res);
    });
  };
  
  
  
  Comment.remove = (id, result) => {
    sql.query("DELETE FROM comments WHERE comment_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Comment with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted comment with comment_id: ", id);
      result(null, res);
    });
  };
  
  Comment.removeAll = result => {
    sql.query("DELETE FROM comments", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} comments`);
      result(null, res);
    });
  };
  
  module.exports = Comment;