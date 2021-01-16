const sql = require("./db.js");

// constructor
const Media = function(media) {
    this.title = media.title;
    this.type = media.type;
    this.url = media.url;
  };
  
  Media.create = (newMedia, result) => {
    console.log(newMedia)
    sql.query("INSERT INTO media SET ?", newMedia, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created media: ", { media_id: res.insertId, ...newMedia });
      result(null, { id: res.insertId, ...newMedia });
    });
  };
  
  Media.findById = (mediaId, result) => {
    sql.query(`SELECT * FROM media WHERE media_id = ${mediaId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found media: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Media with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Media.getAll = result => {
    sql.query("SELECT * FROM media", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("medias: ", res);
      result(null, res);
    });
  };
  
  
  Media.updateById = (id, media, result) => {
    sql.query(
      "UPDATE media SET title = ?, type = ?, url = ? WHERE media_id = ?",
      [media.title, media.type, media.url, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Media with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated media: ", { media_id: id, ...media });
        result(null, { media_id: id, ...media });
      }
    );
  };
  
  Media.remove = (id, result) => {
    sql.query("DELETE FROM media WHERE media_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Media with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted media with media_id: ", id);
      result(null, res);
    });
  };
  
  Media.removeAll = result => {
    sql.query("DELETE FROM media", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} medias`);
      result(null, res);
    });
  };
  
  module.exports = Media;