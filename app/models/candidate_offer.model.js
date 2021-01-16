const sql = require("./db.js");

// constructor
const Candidate_Offer = function(candidate_offer) {
    this.candidate_id = candidate_offer.candidate_id;
    this.offer_id = candidate_offer.offer_id;

  };
  
  Candidate_Offer.create = (newCandidate_Offer, result) => {
    console.log(newCandidate_Offer)
    sql.query("INSERT INTO candidate_offer SET ?", newCandidate_Offer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created candidate_offer: ", { candidate_offer_id: res.insertId, ...newCandidate_Offer });
      result(null, { id: res.insertId, ...newCandidate_Offer });
    });
  };
  
  Candidate_Offer.findById = (candidate_offerId, result) => {
    sql.query(`SELECT * FROM candidate_offer WHERE candidate_offer_id = ${candidate_offerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found candidate_offer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Candidate_Offer with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Candidate_Offer.getAll = result => {
    sql.query("SELECT * FROM candidate_offer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("candidate_offers: ", res);
      result(null, res);
    });
  };
  
  
  Candidate_Offer.updateById = (id, candidate_offer, result) => {
    sql.query(
      "UPDATE candidate_offer SET candidate_id = ?, offer_id = ? WHERE candidate_offer_id = ?",
      [candidate_offer.candidate_id, candidate_offer.offer_id, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Candidate_Offer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated candidate_offer: ", { candidate_offer_id: id, ...candidate_offer });
        result(null, { candidate_offer_id: id, ...candidate_offer });
      }
    );
  };
  
  Candidate_Offer.remove = (id, result) => {
    sql.query("DELETE FROM candidate_offer WHERE candidate_offer_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Candidate_Offer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted candidate_offer with candidate_offer_id: ", id);
      result(null, res);
    });
  };
  
  Candidate_Offer.removeAll = result => {
    sql.query("DELETE FROM candidate_offer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} candidate_offers`);
      result(null, res);
    });
  };
  
  module.exports = Candidate_Offer;