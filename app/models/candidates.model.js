const sql = require("./db.js");

// constructor
const Candidate = function(candidate) {
    this.current_situation_id= candidate.current_situation_id;
    this.cv_id= candidate.cv_id;
    this.user_id= candidate.user_id;
    this.phone= candidate.phone;
    this.address= candidate.address;
    this.postcode= candidate.postcode;
    this.city= candidate.city;
  };
  
  Candidate.create = (newCandidate, result) => {
    console.log(newCandidate)
    sql.query("INSERT INTO candidates SET ?", newCandidate, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created candidate: ", { candidate_id: res.insertId, ...newCandidate });
      result(null, { id: res.insertId, ...newCandidate });
    });
  };
  
  Candidate.findById = (candidateId, result) => {
    sql.query(`SELECT * FROM candidates WHERE candidate_id = ${candidateId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found candidate: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Candidate with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Candidate.getAll = result => {
    sql.query("SELECT * FROM candidates", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("candidates: ", res);
      result(null, res);
    });
  };
  
  
  Candidate.updateById = (id, candidate, result) => {
    sql.query(
      "UPDATE candidates SET current_situation_id = ?, cv_id = ?, candidate_id = ?, phone = ?, address = ?, postcode =?, city = ? WHERE candidate_id = ?",
      [candidate.lastname, candidate.current_situation_id, candidate.cv_id, candidate.candidate_id, candidate.phone, candidate.address, candidate.postcode, candidate.city, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Candidate with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated candidate: ", { candidate_id: id, ...candidate });
        result(null, { candidate_id: id, ...candidate });
      }
    );
  };
  
  Candidate.remove = (id, result) => {
    sql.query("DELETE FROM candidates WHERE candidate_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Candidate with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted candidate with candidate_id: ", id);
      result(null, res);
    });
  };
  
  Candidate.removeAll = result => {
    sql.query("DELETE FROM candidates", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} candidates`);
      result(null, res);
    });
  };
  
  module.exports = Candidate;