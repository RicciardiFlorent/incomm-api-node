const sql = require("./db.js");

// constructor
const Contract = function(contract) {
    this.name = contract.name;
  };
  
  Contract.create = (newContract, result) => {
    sql.query("INSERT INTO contracts SET ?", newContract, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created contract: ", { contract_id: res.insertId, ...newContract });
      result(null, { id: res.insertId, ...newContract });
    });
  };
  
  Contract.findById = (contractId, result) => {
    sql.query(`SELECT * FROM contracts WHERE contract_id = ${contractId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found contract: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Contract with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Contract.getAll = result => {
    sql.query("SELECT * FROM contracts", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("contracts: ", res);
      result(null, res);
    });
  };
  
  
  Contract.updateById = (id, contract, result) => {
    sql.query(
      "UPDATE contracts SET name = ? WHERE contract_id = ?",
      [contract.name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Contract with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated contract: ", { contract_id: id, ...contract });
        result(null, { contract_id: id, ...contract });
      }
    );
  };
  
  Contract.remove = (id, result) => {
    sql.query("DELETE FROM contracts WHERE contract_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Contract with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted contract with contract_id: ", id);
      result(null, res);
    });
  };
  
  Contract.removeAll = result => {
    sql.query("DELETE FROM contracts", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} contracts`);
      result(null, res);
    });
  };
  
  module.exports = Contract;