const sql = require("./db.js");

// constructor
const Post = function(post) {
    this.employee_id = post.employee_id;
    this.media_id = post.media_id;
    this.posted_at = post.posted_at;
    this.author = post.author;
    this.content = post.content;
  };
  
  Post.create = (newPost, result) => {
    console.log(newPost)
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created post: ", { post_id: res.insertId, ...newPost });
      result(null, { id: res.insertId, ...newPost });
    });
  };
  
  Post.findById = (postId, result) => {
    sql.query(`SELECT * FROM posts WHERE post_id = ${postId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found post: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Post with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Post.getAll = result => {
    sql.query("SELECT * FROM posts", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("posts: ", res);
      result(null, res);
    });
  };
  
  
  Post.updateById = (id, post, result) => {
    sql.query(
      "UPDATE posts SET employee_id = ?, media_id = ?, posted_at = ?, author = ?, content = ? WHERE post_id = ?",
      [post.employee_id, post.media_id, post.posted_at, post.author, post.content , id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Post with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated post: ", { post_id: id, ...post });
        result(null, { post_id: id, ...post });
      }
    );
  };
  
  Post.remove = (id, result) => {
    sql.query("DELETE FROM posts WHERE post_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Post with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted post with post_id: ", id);
      result(null, res);
    });
  };
  
  Post.removeAll = result => {
    sql.query("DELETE FROM posts", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} posts`);
      result(null, res);
    });
  };
  
  module.exports = Post;