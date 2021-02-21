const sql = require("./db.js");

// constructor
const Apply_Offer = function(apply_offer) {
    this.apply_offer_id= apply_offer.apply_offer_id;
    this.user_id= apply_offer.user_id;
    this.offer_id= apply_offer.offer_id;
    this.company_id= apply_offer.company_id;
    this.content= apply_offer.content;
    this.date= apply_offer.date;
    this.cv = apply_offer.cv;
  };
  
  Apply_Offer.create = (newApply_Offer, result) => {
    console.log(newApply_Offer)
    sql.query("INSERT INTO apply_offer SET ?", newApply_Offer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created apply_offer: ", { apply_offer_id: res.insertId, ...newApply_Offer });
      result(null, { id: res.insertId, ...newApply_Offer });
    });
  };
  
  Apply_Offer.findById = (apply_offerId, result) => {
    sql.query(`SELECT * FROM users INNER JOIN apply_offer ON users.user_id = apply_offers.user_id AND users.user_id = ${apply_offerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found apply_offer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Apply_Offer with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Apply_Offer.getAll = result => {
    sql.query("SELECT * FROM apply_offer ", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("apply_offers: ", res);
      result(null, res);
    });
  };

  Apply_Offer.findByUserIDandOfferID = (user_id, offer_id, result) => {
    sql.query(`SELECT * FROM apply_offer WHERE user_id = '${user_id}' AND offer_id='${offer_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the email
      result({ kind: "not_found" }, null);
    });
  };
  
  
  

  
  Apply_Offer.remove = (id, result) => {
    sql.query("DELETE FROM apply_offer WHERE apply_offer_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Apply_Offer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted apply_offer with apply_offer_id: ", id);
      result(null, res);
    });
  };
  
  Apply_Offer.removeAll = result => {
    sql.query("DELETE FROM apply_offer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} apply_offers`);
      result(null, res);
    });
  };
  
  module.exports = Apply_Offer;