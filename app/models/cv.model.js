const sql = require("./db.js");

// constructor
const Cv = function(cv) {
    this.name = cv.name;
    this.upload_date = cv.upload_date;
    this.url = cv.url;
  };
  
  Cv.create = (newCv, result) => {
    console.log(newCv)
    sql.query("INSERT INTO cv SET ?", newCv, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created cv: ", { cv_id: res.insertId, ...newCv });
      result(null, { id: res.insertId, ...newCv });
    });
  };
  
  Cv.findById = (cvId, result) => {
    sql.query(`SELECT * FROM cv WHERE cv_id = ${cvId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found cv: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Cv with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Cv.getAll = result => {
    sql.query("SELECT * FROM cv", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("cvs: ", res);
      result(null, res);
    });
  };
  
  
  Cv.updateById = (id, cv, result) => {
    sql.query(
      "UPDATE cv SET name = ?, upload_date = ?, url = ? WHERE cv_id = ?",
      [cv.name, cv.upload_date, cv.url, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Cv with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated cv: ", { cv_id: id, ...cv });
        result(null, { cv_id: id, ...cv });
      }
    );
  };
  
  Cv.remove = (id, result) => {
    sql.query("DELETE FROM cv WHERE cv_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Cv with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted cv with cv_id: ", id);
      result(null, res);
    });
  };
  
  Cv.removeAll = result => {
    sql.query("DELETE FROM cv", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} cvs`);
      result(null, res);
    });
  };
  
  module.exports = Cv;