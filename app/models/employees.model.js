const sql = require("./db.js");

// constructor
const Employee = function(employee) {
    this.company_id= employee.company_id;
    this.user_id= employee.user_id;
    this.role= employee.role;
  };
  
  Employee.create = (newEmployee, result) => {
    console.log(newEmployee)
    sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created employee: ", { employee_id: res.insertId, ...newEmployee });
      result(null, { id: res.insertId, ...newEmployee });
    });
  };
  
  Employee.findById = (employeeId, result) => {
    sql.query(`SELECT * FROM users INNER JOIN employees ON users.user_id = employees.user_id AND users.user_id = ${employeeId} `, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found employee: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Employee with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Employee.getAll = result => {
    sql.query("SELECT * FROM users INNER JOIN employees ON users.user_id = employees.user_id", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("employees: ", res);
      result(null, res);
    });
  };
  
  
  Employee.updateById = (id, employee, result) => {
    sql.query(
      "UPDATE employees SET company_id = ?, user_id = ?, role = ? WHERE employee_id = ?",
      [employee.company_id, employee.user_id, employee.role, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Employee with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated employee: ", { employee_id: id, ...employee });
        result(null, { employee_id: id, ...employee });
      }
    );
  };
  
  Employee.remove = (id, result) => {
    sql.query("DELETE FROM employees WHERE employee_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted employee with employee_id: ", id);
      result(null, res);
    });
  };
  
  Employee.removeAll = result => {
    sql.query("DELETE FROM employees", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} employees`);
      result(null, res);
    });
  };
  
  module.exports = Employee;