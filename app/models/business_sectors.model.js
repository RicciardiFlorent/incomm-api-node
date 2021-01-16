const sql = require("./db.js");

// constructor
const Business_Sector = function(business_sectors) {
    this.name = business_sectors.name;

  };
  
  Business_Sector.create = (newBusiness_Sector, result) => {
    console.log(newBusiness_Sector)
    sql.query("INSERT INTO business_sectors SET ?", newBusiness_Sector, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created business_sectors: ", { business_sectors_id: res.insertId, ...newBusiness_Sector });
      result(null, { id: res.insertId, ...newBusiness_Sector });
    });
  };
  
  Business_Sector.findById = (business_sectorsId, result) => {
    sql.query(`SELECT * FROM business_sectors WHERE business_sectors_id = ${business_sectorsId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found business_sectors: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Business_Sector with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Business_Sector.getAll = result => {
    sql.query("SELECT * FROM business_sectors", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("business_sectorss: ", res);
      result(null, res);
    });
  };
  
  
  Business_Sector.updateById = (id, business_sectors, result) => {
    sql.query(
      "UPDATE business_sectors SET name = ? WHERE business_sectors_id = ?",
      [business_sectors.name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Business_Sector with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated business_sectors: ", { business_sectors_id: id, ...business_sectors });
        result(null, { business_sectors_id: id, ...business_sectors });
      }
    );
  };
  
  Business_Sector.remove = (id, result) => {
    sql.query("DELETE FROM business_sectors WHERE business_sectors_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Business_Sector with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted business_sectors with business_sectors_id: ", id);
      result(null, res);
    });
  };
  
  Business_Sector.removeAll = result => {
    sql.query("DELETE FROM business_sectors", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} business_sectorss`);
      result(null, res);
    });
  };
  
  module.exports = Business_Sector;