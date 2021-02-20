const sql = require("./db.js");

// constructor
const Offer = function(offer) {
    this.contract_id= offer.contract_id;
    this.employee_id= offer.employee_id;
    this.posted_at= offer.posted_at;
    this.content= offer.content;
    this.title= offer.title;
    this.fast_apply= offer.fast_apply;
    this.url= offer.url;
    this.salary= offer.salary;
    this.city= offer.city;
    this.department= offer.department;
    this.start_date= offer.start_date;
    this.end_date= offer.end_date;
    this.offer_sector_id= offer.offer_sector_id;
    this.company_id = offer.company_id;
  };
  Offer.create = (newOffer, result) => {
    console.log(newOffer)
    sql.query("INSERT INTO offers SET ?", newOffer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created offer: ", { offer_id: res.insertId, ...newOffer });
      result(null, { id: res.insertId, ...newOffer });
    });
  };
  
  Offer.findById = (offerId, result) => {
    sql.query(`SELECT * FROM offers WHERE offer_id = ${offerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found offer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Offer with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Offer.getAll = result => {
    sql.query("SELECT * FROM offers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("offers: ", res);
      result(null, res);
    });
  };

  Offer.getAllByCompany = (id,result) => {
    sql.query("SELECT * FROM offers WHERE company_id = ?", id,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("offers: ", res);
      result(null, res);
    });
  };


  Offer.getNbOffers = result => {
    sql.query("SELECT company_id, count(offer_id) as nbOffers from offers group by company_id", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
  
  
  Offer.updateById = (id, offer, result) => {
    sql.query(
      "UPDATE offers SET contract_id = ?, employee_id = ?, content = ?, title = ?, fast_apply = ?, url = ?, salary = ?, city = ?, department = ?, start_date=?, end_date = ?, offer_sector_id = ? WHERE offer_id = ?",
      [  offer.contract_id,offer.employee_id,offer.content,offer.title,offer.fast_apply,offer.url,offer.salary,offer.city,offer.department,offer.start_date,offer.end_date,offer.offer_sector_id, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Offer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated offer: ", { offer_id: id, ...offer });
        result(null, { offer_id: id, ...offer });
      }
    );
  };
  
  Offer.remove = (id, result) => {
    sql.query("DELETE FROM offers WHERE offer_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Offer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted offer with offer_id: ", id);
      result(null, res);
    });
  };
  
  Offer.removeAll = result => {
    sql.query("DELETE FROM offers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} offers`);
      result(null, res);
    });
  };
  
  module.exports = Offer;