const sql = require("./db.js");

// constructor
const Current_Situation = function(current_situation) {
    this.name = current_situation.name;
  };
  
  Current_Situation.create = (newCurrent_Situation, result) => {
    console.log(newCurrent_Situation)
    sql.query("INSERT INTO current_situations SET ?", newCurrent_Situation, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created current_situations: ", { current_situation_id: res.insertId, ...newCurrent_Situation });
      result(null, { id: res.insertId, ...newCurrent_Situation });
    });
  };
  
  Current_Situation.findById = (current_situationId, result) => {
    sql.query(`SELECT * FROM current_situations WHERE current_situation_id = ${current_situationId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found current_situations: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Current_Situation with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Current_Situation.getAll = result => {
    sql.query("SELECT * FROM current_situations", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("current_situations: ", res);
      result(null, res);
    });
  };
  
  
  Current_Situation.updateById = (id, current_situation, result) => {
    sql.query(
      "UPDATE current_situations SET name = ? WHERE current_situation_id = ?",
      [current_situation.name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Current_Situation with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated current_situation: ", { current_situation_id: id, ...current_situation });
        result(null, { current_situation_id: id, ...current_situation });
      }
    );
  };
  
  Current_Situation.remove = (id, result) => {
    sql.query("DELETE FROM current_situations WHERE current_situation_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Current_Situation with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted current_situation with current_situation_id: ", id);
      result(null, res);
    });
  };
  
  Current_Situation.removeAll = result => {
    sql.query("DELETE FROM current_situations", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} current_situations`);
      result(null, res);
    });
  };
  
  module.exports = Current_Situation;