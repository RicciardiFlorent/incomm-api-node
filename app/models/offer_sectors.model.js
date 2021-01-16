const sql = require("./db.js");

// constructor
const Offer_sector = function(offer_sector) {
    this.name = offer_sector.name;
  };
  
  Offer_sector.create = (newOffer_sector, result) => {
    console.log(newOffer_sector)
    sql.query("INSERT INTO offer_sectors SET ?", newOffer_sector, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created offer_sector: ", { offer_sector_id: res.insertId, ...newOffer_sector });
      result(null, { id: res.insertId, ...newOffer_sector });
    });
  };
  
  Offer_sector.findById = (offer_sectorId, result) => {
    sql.query(`SELECT * FROM offer_sectors WHERE offer_sector_id = ${offer_sectorId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found offer_sector: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Offer_sector with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Offer_sector.getAll = result => {
    sql.query("SELECT * FROM offer_sectors", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("offer_sectors: ", res);
      result(null, res);
    });
  };
  
  
  Offer_sector.updateById = (id, offer_sector, result) => {
    sql.query(
      "UPDATE offer_sectors SET name = ? WHERE offer_sector_id = ?",
      [offer_sector.name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Offer_sector with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated offer_sector: ", { offer_sector_id: id, ...offer_sector });
        result(null, { offer_sector_id: id, ...offer_sector });
      }
    );
  };
  
  Offer_sector.remove = (id, result) => {
    sql.query("DELETE FROM offer_sectors WHERE offer_sector_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Offer_sector with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted offer_sectors with offer_sector_id: ", id);
      result(null, res);
    });
  };
  
  Offer_sector.removeAll = result => {
    sql.query("DELETE FROM offer_sectors", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} offer_sectors`);
      result(null, res);
    });
  };
  
  module.exports = Offer_sector;