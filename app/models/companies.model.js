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
    this.logo= companie.logo;
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

  Companie.insertImage = (image, id, result) => {
    sql.query(`UPDATE companies SET logo = "${image}" WHERE company_id = ${id} `, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("updated company: ", { company_id: id });
      result(null, { company_id: id  });
    });
  }
  
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

  Companie.findByEmployeeId = (employeeId, result) => {
    sql.query(`SELECT * FROM companies JOIN employees ON employees.company_id = companies.company_id WHERE employee_id = ${employeeId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found company: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Companie with the id
      result({ kind: "not_found" }, null);
    });
  };

  Companie.findByUserId = (userId, result) => {
    sql.query(`SELECT * FROM companies JOIN employees ON employees.company_id = companies.company_id WHERE user_id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found company: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Companie with the id
      result({ kind: "not_found" }, null);
    });
  };

  Companie.getImageByID = (id, result) =>{
    sql.query(`SELECT image FROM companies WHERE company_id = "${id}"`, (err, res) => {
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
  }
  
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

  Companie.getAllEmployee = (idCompany, result) => {
    sql.query(`SELECT * FROM employees WHERE company_id = "${idCompany}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found companie: ", res);
        result(null, res);
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

  Companie.getRandom = result => {
    sql.query(`  SELECT * FROM companies ORDER BY RAND() LIMIT 3`, (err, res) => {
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
      "UPDATE companies SET name =?, referent_lastname = ?, referent_firstname = ?, referent_email = ?, referent_phone = ?, status = ?, business_sector_id = ?, logo= ? WHERE company_id = ?",
      [companie.name, companie.referent_lastname, companie.referent_firstname, companie.referent_email, companie.referent_phone, companie.status, companie.business_sector_id, companie.logo, id],
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