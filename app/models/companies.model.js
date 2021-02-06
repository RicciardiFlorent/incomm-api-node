const sql = require("./db.js");

// constructor
const Companie = function(companie) {
    this.name= companie.name;
    this.referent_lastname= companie.referent_lastname;
    this.referent_firstname= companie.referent_firstname;
    this.referent_email= companie.referent_email;
    this.referent_phone= companie.referent_phone;
    this.status= companie.status;
    this.business_sector_id= companie.business_sector_id;
    this.image= companie.image;
  };
  
  Companie.create = (newCompanie, result) => {
    console.log(newCompanie)
    sql.query("INSERT INTO companies SET ?", newCompanie, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created companie: ", { company_id: res.insertId, ...newCompanie });
      result(null, { id: res.insertId, ...newCompanie });
    });
  };
  
  Companie.findById = (companieId, result) => {
    sql.query(`SELECT * FROM companies WHERE company_id = ${companieId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found companie: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Companie with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Companie.findByName = (companyName, result) => {
    sql.query(`SELECT * FROM companies WHERE name = "${companyName}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found companie: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Companie with the name
      result({ kind: "not_found" }, null);
    });
  };
  
  Companie.getAll = result => {
    sql.query("SELECT * FROM companies", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("companies: ", res);
      result(null, res);
    });
  };
  
  
  Companie.updateById = (id, companie, result) => {
    sql.query(
      "UPDATE companies SET name =?, referent_lastname = ?, referent_firstname = ?, referent_email = ?, referent_phone = ?, status = ?, business_sector_id = ?, image= ? WHERE company_id = ?",
      [companie.name, companie.referent_lastname, companie.referent_firstname, companie.referent_email, companie.referent_phone, companie.status, companie.business_sector_id, companie.image, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Companie with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated companie: ", { company_id: id, ...companie });
        result(null, { company_id: id, ...companie });
      }
    );
  };
  
  Companie.remove = (id, result) => {
    sql.query("DELETE FROM companies WHERE company_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Companie with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted companies with company_id: ", id);
      result(null, res);
    });
  };
  
  Companie.removeAll = result => {
    sql.query("DELETE FROM companies", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} companies`);
      result(null, res);
    });
  };
  
  module.exports = Companie;